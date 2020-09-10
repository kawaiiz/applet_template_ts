import { gotoLogin, gotoError } from './util'
import { BASEURL } from "./config"
import http from './api.request'
import { globalDataStore } from '../../store/globalData/globalData'
/*
* 请求函数说明
*
* 1.每一次的请求都会带上token,如果token不存在则token赋空值
* 2.采用promise写法。当请求成功，返回promise回正确的流程中，否则则会直接进行统一处理
* 3.请求成功返回promise分为两种情况 ①status/code=1 返回resolve ②status/code=0 返回reject
*
* */
export interface IRes<T> {
  code: number,
  errMsg?: string,
  data: T
}

interface InitOption {
  data: any,
  url?: string,
  allUrl?: string,
  requestLoading?: boolean,
  method?:
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT',
  contentType?: string
}

interface HttpRequestInterface {
  requestSuccess: (res: any, option: InitOption) => Promise<any>;
  requestFail: (res: any, option: InitOption) => void;
  createOptions(option: InitOption, resolve: any, reject: any): WechatMiniprogram.RequestOption;
  request: (option: InitOption) => Promise<any>;
  interceptorsRequest: () => Promise<any>
  interceptorsResponent: (option: InitOption) => Promise<any>
}

/**
 * @desc url部分地址
 * @desc allUrl 全部地址 
 * @desc data 携带数据
 * @desc noLoad 加载动画
 * @desc t 请求类型
 */

// 为防止同时多个请求进入
// 是否正在刷新的标记
let isRefreshing = false;
// 待请求队列 在请求之前被拦截下来，每一项是被拦截下来的请求
let requests: Function[] = [];
// 待请求队列 在请求之后被拦截下来，每一项是被拦截下来的请求
let responents: Function[] = [];
// 请求是否正常
// let requestFlag = true
// 请求对列
let requestList: any[] = []

const createFormData = (obj: { [key: string]: any } = {}) => {
  let result = ''
  for (let name of Object.keys(obj)) {
    let value = obj[name];
    result +=
      '\r\n--XXX' +
      '\r\nContent-Disposition: form-data; name=\"' + name + '\"' +
      '\r\n' +
      '\r\n' + value
  }
  return result + '\r\n--XXX--'
}

// 获取token 恢复请求
const getToken = async (): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log('获取token')
    wx.login({
      success(res) {
        const { code } = res
        const requestData = { code, pid: 0, isTwo: 0, isPublic: 0 }
        wx.request({
          url: `${BASEURL}/mini/login/login`,
          method: "POST",
          data: createFormData(requestData),
          header: {
            'content-type': 'multipart/form-data; boundary=XXX'
          },
          success(res: any) {
            if (res.statusCode === 200 && res.data.code === 1) {
              globalDataStore.setToken(res.data.data)
              isRefreshing = false
              resolve()
            } else {
              reject()
            }
          },
          fail(e) {
            reject(e)
          }
        })
      },
      fail(e) {
        reject(e)
      }
    })
  })
}

class HttpRequest implements HttpRequestInterface {
  requestTask = null;// 请求的对象
  BASEURL = BASEURL;// 请求的域名
  queue = {}; // 参数
  /**
   * 请求成功
   */
  requestSuccess(res: any, option: InitOption) {
    for (let i = 0; i < requestList.length; i++) {
      if (requestList[i] === this.requestTask) {
        requestList.splice(i, 1)
      }
    }
    if (res && (res.statusCode == 200)) {
      let data: any = res.data
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      if (data.code === 1) {
        return Promise.resolve(data)
      } else if (data.code == 2) {
        // 登录失效 则前往启动页
        globalDataStore.setToken("")
        gotoLogin()
        return Promise.reject(data)
        // return this.interceptorsResponent(option)
      } else if (data.code == 0) {
        return Promise.reject(data)
      } else {
        console.log(data, option)
        gotoError()
        return Promise.reject(data)
      }
    } else {
      console.log(res, option)
      gotoError()
      return Promise.reject(res.data)
    }
  }

  /**
 * 请求失败
 */
  requestFail(err: any, option: InitOption) {
    console.log(err)
    // requestFlag = false;
    for (let i = requestList.length - 1; i >= 0; i--) {
      if (requestList[i].abort) {
        requestList[i].abort();
      }
      requestList.pop()
    }
    console.log(err, option)
    // 判断当前页是否是错误页，如果是就不跳了
    gotoError()
  }

  createOptions(option: InitOption, resolve: any, reject: any): WechatMiniprogram.RequestOption {
    //给每次请求配上token
    let token = ''
    try {
      token = globalDataStore.token || '';
    } catch (e) {
      console.log(e)
    }
    if (option.contentType === 'multipart/form-data; boundary=XXX' && option.method === 'POST') {
      option.data = createFormData(option.data)
    }
    // option.data = 
    // option.data.token = token; 
    // 'application/x-www-form-urlencoded;charset=UTF-8' 
    // 'multipart/form-data; boundary=XXX' 
    // if () {

    // }
    return {
      url: option.allUrl ? option.allUrl : this.BASEURL + option.url,
      data: option.data,
      header: {
        // 'Content-Type': option.contentType ? option.contentType : 'application/json;charset=UTF-8',
        'Content-Type': option.contentType ? option.contentType : 'text/plain;charset=UTF-8',
        'Authorization': token
      },
      method: option.method ? option.method : 'POST',
      success: (res: any) => {
        resolve(res)
      },
      fail: (err: any) => {
        this.requestFail(err, option)
        reject()
      },
      complete: () => {
        if (option.requestLoading) {
          wx.hideLoading();
        }
      }
    }
  }

  // 当401时需要拦截 当然 这两个里也可以做其他的拦截
  async interceptorsRequest(): Promise<void> {
    if (!isRefreshing) {
      return Promise.resolve()
    } else {
      return new Promise(resolve => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行让代码跑下去
        requests.push(async () => {
          resolve()
        })
      });
    }
  }
  // 如果401需要拦截接下来所有的请求
  async interceptorsResponent(option: InitOption): Promise<any> {
    try {
      if (!isRefreshing) {
        isRefreshing = true
        await getToken();
        requests.forEach(cb => cb());
        responents.forEach(cb => cb());
        requests = [];
        responents = [];
        return http.request(option)
      } else {
        return new Promise(resolve => {
          console.log(option)
          responents.push(async () => {
            try {
              console.log(option)
              const res = await http.request(option)
              resolve(res)
            } catch (e) {
              console.log(e)
            }
          })
        });
        // return http.request(option)
      }
    } catch (e) {
      return Promise.reject()
    }
  }
  // 请求
  request<T>(option: InitOption = {
    data: {},
    url: ''
  }): Promise<IRes<T>> {
    return new Promise(async (resolve, reject) => {
      // 请求提示弹窗
      if (option.requestLoading) {
        wx.showLoading({
          title: '请稍等',
        })
      }
      await this.interceptorsRequest()
      // 这里因为必须要跳出这个promise 要把resolve传进去
      let options = this.createOptions(option, resolve, reject)
      const requestTask = wx.request(options);
      requestList.push(requestTask)
    }).then((res) => {
      return this.requestSuccess(res, option)
    })
  }
}

export default HttpRequest
