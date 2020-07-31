/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */

export function getHandledValue(num: number) {
  return num < 10 ? "0" + num : num.toString();
} // 处理日期数据

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，不传则返回年开头的完整时间
 */
export function getDate(data: Date | string | number, startType?: "yyyy-mm-dd" | "yyyy-mm-dd hh:mm:ss" | "yyyymmddhh hhmm" | "hh:mm" | "yyyy年mm月dd日") {
  // 传 时间或时间戳
  let d: Date
  if (typeof data === "object") {
    d = data
  } else if (typeof data === "string") {
    d = new Date(data);
  } else if (typeof data === "number") {
    if (!isMillisecond(data)) {
      d = new Date(data * 1000);
    } else {
      d = new Date(data);
    }
  } else {
    d = new Date(data);
  }
  let year = d.getFullYear();
  let month = getHandledValue(d.getMonth() + 1);
  let date = getHandledValue(d.getDate());
  let hours = getHandledValue(d.getHours());
  let minutes = getHandledValue(d.getMinutes());
  let second = getHandledValue(d.getSeconds());
  let resStr = "";
  if (startType === "yyyy-mm-dd") resStr = year + "-" + month + "-" + date; else if (startType === "yyyy-mm-dd hh:mm:ss") resStr = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + second; else if (startType === "yyyymmddhh hhmm") resStr = year + month + date + " " + hours + minutes; else if (startType === "hh:mm") resStr = hours + ":" + minutes; else if (startType === "yyyy年mm月dd日") resStr = year + "年" + month + "月" + date + "日"; else resStr = month + "-" + date + " " + hours + ":" + minutes;
  return {
    time: resStr,
    year: year,
    month: month,
    date: date,
    hours: hours,
    minutes: minutes,
    second: second
  };
}

/**
 * @desc 获取url参数的值
 * @param {string} timeStamp 请求参数字符串
 * @param {string} startType 需要的参数
 */
export const getQueryString = (query: string, name: string) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = query.match(reg);
  //if (r!=null) return r[2]; return '';
  return r ? decodeURIComponent(r[2]) : null;
}

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
  const time = duration || 1000
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
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = (timeStamp: number) => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp: number, currentTime: number) => {
  return timeStamp < currentTime
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = (timeStamp: number) => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  let currentTime = new Date().getTime()
  const IS_MILLISECOND_CURRENT = isMillisecond(currentTime)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND_CURRENT) Math.floor(currentTime /= 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = Number((currentTime - timeStamp).toFixed(0))
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ""
  const dirStr = IS_EARLY ? "前" : "后"
  // 少于等于59秒
  if (diff <= 59) resStr = diff + "秒" + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + "分钟" + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + "小时" + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + "天" + dirStr
  else resStr = getDate(timeStamp, "yyyy-mm-dd hh:mm:ss").time
  return resStr
}


/**
 * @param {Number|null} timeSecond 秒数
 * @returns {String} 00:03时间字符串
 */
export const getTimeStr = (timeSecond: number | null) => {
  timeSecond = timeSecond ? timeSecond : 0
  const min = Math.floor(timeSecond / 60)
  const second = Number((timeSecond - min * 60).toFixed(0))
  return `${getHandledValue(min)}: ${getHandledValue(second)}`
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
  console.log(res)
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
  console.log(config)
  return config
}

/**
 * @param {Number|null} ms 需要延时的毫秒数
 * @returns {String} 延时函数
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))