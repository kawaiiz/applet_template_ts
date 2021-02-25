import { IRes } from './http'


/**
 * @desc 获取当前页面
 */
export const getNowPage = () => {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

/**
 * @desc {Number} 自动更新小程序
 */
export function autoUpdate() {
  // 获取小程序更新机制兼容
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    //1. 检查小程序是否有新版本发布
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        //2. 小程序有新版本，则静默下载新版本，做好更新准备
        updateManager.onUpdateReady(() => {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: (res) => {
              if (res.confirm) {
                //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              } else if (res.cancel) {
                //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  success: function (res) {

                    //第二次提示后，强制更新                      
                    if (res.confirm) {
                      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                      updateManager.applyUpdate()
                    } else if (res.cancel) {
                      //重新回到版本更新提示
                      autoUpdate()
                    }
                  }
                })
              }
            }
          })
        })
        updateManager.onUpdateFailed(() => {
          // 新的版本下载失败
          wx.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线~，请您删除当前小程序，重新搜索打开~',
          })
        })
      }
    })
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
}

/**
 * @desc {Number} 消息提示
 */
interface ToastPorp {
  title: string,
  cb?: Function,
  duration?: number
}

/**
 * @desc 提示弹窗
 * @param {string} title 内容
 * @param {function} cb 回调函数
 * @param {number} duration 延时时间
 */
export const toast = (option: ToastPorp | string) => {
  let title, cb: Function | undefined, duration
  if (typeof option === 'string') {
    title = option
    cb = undefined
    duration = null
  } else {
    title = option.title
    cb = option.cb
    duration = option.duration
  }
  const time = duration || 1500
  wx.showToast({
    title: title,
    icon: 'none',
    duration: time,
    complete: function () {
      setTimeout(() => {
        return typeof (cb) === 'function' && cb();
      }, time)
    }
  })
}

/**
 * @returns {String} 获取系统屏幕相关参数
 */
export const setNavStyle = () => {
  const config: GlobalData.PageConfig = {
    pixelRate: 0.5,               //px与rpx换算关系
    platform: 'ios',             //操作平台 用于适配胶囊高度
    capsuleHeight: 44,           //胶囊高度
    statusBarHeight: 20,         //手机顶部状态栏高度
    titleHeight: 136,            //整个导航头高度
    systemHeight: 0,            //手机屏幕高度
    isAllScreen: false,        //是否是全面屏手机
    isHighHead: false,        //是否是刘海屏手机
    phoneSystem: undefined           //系统版本
  }
  let res = wx.getSystemInfoSync();
  // 设置系统
  config.phoneSystem = res.platform.toLowerCase() as "ios" | "android";
  config.pixelRate = res.windowWidth / 750;
  config.platform = res.platform;
  config.statusBarHeight = res.statusBarHeight;
  if (res.platform.toLowerCase() == 'android') {
    config.capsuleHeight += 4;
  }
  config.titleHeight = (config.capsuleHeight + config.statusBarHeight) / config.pixelRate;
  if (res.statusBarHeight >= 44) {
    config.isHighHead = true;
  }
  if (res.windowHeight > 750) config.isAllScreen = true;
  config.systemHeight = res.windowHeight;
  console.log(res, config)
  return config
}

/**
 * @param {Number|null} ms 需要延时的毫秒数
 * @returns {String} 延时函数
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * @param {Number|null} ms 需要延时的毫秒数
 * @returns {String} 延时函数
 */
export function mockData<T>(type: 'data', item: T): Promise<IRes<T>>;
export function mockData<T>(type: 'list', item: T, title: string, pageIndex: number, pageSize: number): Promise<IRes<{
  list: T[];
  pageCount: number;
}>>;
export function mockData<T>(type: 'data' | 'list', item: T, title?: string, pageIndex?: number, pageSize?: number): any {
  if (type === 'data') {
    return new Promise(async (resolve) => {
      await delay(1000)
      resolve({
        data: item,
        code: 200
      } as IRes<T>)
    })
  } else {
    const dataList: T[] = []
    for (let i = 0; i < pageSize!; i++) {
      dataList.push({
        ...item,
        id: i + 1 + (pageIndex! - 1) * pageSize!,
        [title!]: `${i + 1 + (pageIndex! - 1) * pageSize!}条数据`
      })
    }
    return new Promise(async (resolve) => {
      await delay(1000)
      resolve({
        data: {
          list: dataList,
          pageCount: 2
        },
        code: 200
      } as IRes<{
        list: T[];
        pageCount: number;
      }>)
    })
  }
}

/*
 *是否已经在错误页
 */
const isErrorPage = () => {
  // 判断当前页是否是错误页，如果是就不跳了
  const currentPage = getNowPage()
  return currentPage.route.indexOf('error') !== -1
}

/*
 * 前往错误页 
 */
export const gotoError = () => {
  // 判断当前页是否是错误页，如果是就不跳了
  if (!isErrorPage()) {
    wx.navigateTo({
      url: '/pages/error/500/500?t=error'
    })
  }
}

/*
 * 是否已经在登录页
 */
const isStartPage = () => {
  // 判断当前页是否是登录页，如果是就不跳了
  const currentPage = getNowPage()
  if (currentPage) {
    return currentPage.route.indexOf('pages/login/login/login') !== -1
  } else {
    return true
  }
}

/*
 * 前往登录页
 */
export const gotoLogin = () => {
  // 判断当前页是否是启动页页，如果是就不跳了
  if (!isStartPage()) {
    wx.reLaunch({
      url: "/pages/login/login/login"
    })
  }
}

/*
 * console 带上路径
 */
export const myConsole = (data: any, _this: any) => {
  // 判断当前页是否是启动页页，如果是就不跳了
  console.log(`页面：${_this.route}`, data)
}


/*
 * 用于判断图片返回的路径是否带有域名
 */
export const isHaveBASEURL = (string: string, BASEURL: string) => {
  return string.indexOf(BASEURL) !== -1
}

