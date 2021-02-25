import { gotoLogin, gotoError, toast, } from './util'
import { BASEURL, httpConfig, ACCESS_TOKEN, REFRESH_TOKEN } from "./config"
import http from './api.request'
import store from '../../store/index/index'
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
  msg: string | null,
  data: T,
  success: boolean
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
  isLogin?: boolean
  header?: Record<string, any>
}


interface UploadFileOption {
  url: string,
  allUrl?: string,
  filePath: string
  name?: string,
  header?: Object,
  formData?: any
  timeout?: number,
  requestLoading?: boolean,
  requestType: string // 用于区分request还是upFile
}

interface HttpRequestInterface {
  requestSuccess: (res: any, option: InitOption) => Promise<any>;
  requestFail: (res: any, option: InitOption) => void;
  requestAbort: (timeout: any) => void
  createOptions(option: InitOption, resolve: any, reject: any): WechatMiniprogram.RequestOption;
  createUpFileOption(option: UploadFileOption, resolve: any, reject: any): WechatMiniprogram.UploadFileOption;
  request: (option: InitOption) => Promise<any>;
  upFile: <T>(option: UploadFileOption) => Promise<IRes<T>>
  interceptorsRequest: (option: InitOption) => Promise<any>
  interceptorsResponent: (option: InitOption | UploadFileOption) => Promise<any>
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
// 待请求队列 在请求之前被拦截下来，每一项是被拦截下来的请求 当token更新成功时时 循环 requests/responents 直接执行 ，当token更新失败则需要取消里面的请求
let requests: ((timeout?: boolean) => void)[] = [];
// 待请求队列 在请求之后被拦截下来，每一项是被拦截下来的请求
let responents: ((timeout?: boolean) => void)[] = [];
// 请求是否正常
// let requestFlag = true
// 请求对列
let requestList: WechatMiniprogram.RequestTask[] = []

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
  try {
    await store.resetToken()
    isRefreshing = false
  } catch (e) {
    console.log(e)
    toast(e.msg || '登录信息已过期')
    isRefreshing = false
    return Promise.reject(e)
  }
}

class HttpRequest implements HttpRequestInterface {
  requestTask = null;// 请求的对象
  BASEURL = BASEURL;// 请求的域名
  queue = {}; // 参数
  /**
   * 请求成功
   */
  async requestSuccess(res: any, option: InitOption | UploadFileOption) {
    for (let i = 0; i < requestList.length; i++) {
      if (requestList[i] === this.requestTask) {
        requestList.splice(i, 1)
      }
    }
    if (res && (res.statusCode === 200)) {
      let data: any = res.data
      if (typeof data === 'string') {
        data = JSON.parse(data)
      }
      if (httpConfig.statusSuccess.indexOf(data[httpConfig.statusField]) !== -1) {
        return Promise.resolve(data)
      } else {
        if (data[httpConfig.statusField] === false && data.code === -401) {
          // 拦截请求
          // 更新token
          await store.setToken("")
          try {
            return await this.interceptorsResponent(option)
          } catch (e) {
            gotoLogin()
            return Promise.reject(e)
          }
        } else if (data.code === 401) {
          gotoLogin()
          return Promise.reject(res.data)
        } else {
          return Promise.reject(res.data)
        }
      }
    } else if (res.statusCode === 401) {
      // 拦截请求
      try {
        return await this.interceptorsResponent(option)
      } catch (e) {
        gotoLogin()
        return Promise.reject(e)
      }
    } else if (res.statusCode === 403) {
      return Promise.reject(res.data)
    } else {
      console.log(res, option)
      gotoError()
      return Promise.reject(res.data)
    }
  }
  /**
    *  操作失败需要清空队列里的所有请求
    */
  requestAbort() {
    // requestFlag = false;
    for (let i = requestList.length - 1; i >= 0; i--) {
      if (requestList[i] && requestList[i].abort) {
        requestList[i].abort();
      }
      requestList.pop()
    }
    for (let i = requests.length - 1; i >= 0; i--) {
      requests[i]()
      requests.pop()
    }
    for (let i = responents.length - 1; i >= 0; i--) {
      responents[i]()
      responents.pop()
    }
  }

  /**
    * 请求操作失败（可能是手机网络不好 导致报错）
    */
  requestFail(err: any, option: InitOption | UploadFileOption) {
    console.log(err, option)
    this.requestAbort()
    // 判断当前页是否是错误页，如果是就不跳了
    gotoError()
  }

  createOptions(option: InitOption, resolve: any, reject: any): WechatMiniprogram.RequestOption {
    //给每次请求配上token
    // let token = store.token || '';
    let token = wx.getStorageSync(ACCESS_TOKEN) || '';
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
        'Content-Type': option.contentType ? option.contentType : 'application/json;charset=UTF-8',
        'Authorization': token,
        ...(option.header || {})
      },
      method: option.method ? option.method : 'POST',
      success: (res: any) => {
        resolve(res)
      },
      fail: (err: any) => {
        this.requestFail(err, option)
        reject(err)
      },
      complete: () => {
        if (option.requestLoading) {
          wx.hideLoading();
        }
      }
    }
  }

  createUpFileOption(option: UploadFileOption, resolve: any, reject: any): WechatMiniprogram.UploadFileOption & { requestType: string } {
    //给每次请求配上token
    let token = ''
    try {
      token = store.token || '';
    } catch (e) {
      console.log(e)
    }
    return {
      requestType: 'uploadFile',
      url: option.allUrl || `${this.BASEURL}${option.url}`,
      name: option.name || 'file',
      filePath: option.filePath,
      formData: option.formData || {},
      header: {
        ...(option.header || {}),
        'Authorization': token
      },
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

  // 当401时需要拦截后续非登录的请求 当然 这两个里也可以做其他的拦截
  async interceptorsRequest(option: InitOption | UploadFileOption): Promise<void> {
    if (!isRefreshing || (option as InitOption).isLogin) {
      return Promise.resolve()
    } else {
      return new Promise((resolve, reject) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行让代码跑下去
        requests.push(async (timeout?: boolean) => {
          if (timeout) return reject({
            code: null,
            msg: '登录过期',
            data: null,
            success: false
          })
          resolve()
        })
      });
    }
  }
  // 如果401需要拦截接下来所有的请求 重新请求token 当token请求到则继续之前的请求，如果请求不到则要把之前的请求都给清空
  async interceptorsResponent(option: InitOption | UploadFileOption): Promise<any> {
    try {
      if (!isRefreshing) {
        isRefreshing = true
        await getToken();
        requests.forEach(cb => cb());
        responents.forEach(cb => cb());
        requests = [];
        responents = [];
        if ((option as UploadFileOption).requestType === 'file') {
          return http.upFile(option as UploadFileOption)
        } else {
          return http.request(option as InitOption)
        }
      } else {
        return new Promise((resolve, reject) => {
          console.log(option)
          // 是否是时间过期 过期则不进行请求
          responents.push(async (timeout?: boolean) => {
            try {
              console.log(option)
              if (timeout) return reject({
                code: null,
                msg: '登录过期',
                data: null,
                success: false
              })
              let res
              if ((option as UploadFileOption).requestType === 'file') {
                res = await http.upFile(option as UploadFileOption)
              } else {
                res = await http.request(option as InitOption)
              }
              resolve(res)
            } catch (e) {
              console.log(e)
            }
          })
        });
        // return http.request(option)
      }
    } catch (e) {
      console.log(e)
      requests.forEach(cb => cb(true));
      responents.forEach(cb => cb(true));
      requests = [];
      responents = [];
      return Promise.reject(e)
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
      await this.interceptorsRequest(option)
      // 这里因为必须要跳出这个promise 要把resolve传进去
      let options = this.createOptions(option, resolve, reject)
      const requestTask = wx.request(options);
      requestList.push(requestTask)
    }).then((res) => {
      return this.requestSuccess(res, option)
    })
  }

  // 上传文件
  upFile<T>(option: UploadFileOption = {
    url: '',
    filePath: '',
    formData: {},
    requestType: 'file'
  }): Promise<IRes<T>> {
    return new Promise(async (resolve, reject) => {
      // 请求提示弹窗
      if (option.requestLoading) {
        wx.showLoading({
          title: '请稍等',
        })
      }
      await this.interceptorsRequest(option)
      // 这里因为必须要跳出这个promise 要把resolve传进去
      let options = this.createUpFileOption(option, resolve, reject)
      const requestTask = wx.uploadFile(options);
      requestList.push(requestTask)
    }).then((res) => {
      return this.requestSuccess(res, option)
    })
  }
}

export default HttpRequest
