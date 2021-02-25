const { action } = require('mobx-miniprogram')
import { delay, mockData } from '../../public/utils/util'
import { getCaptcha } from './service'
import { OtherStore, OtherAction, GetCaptchaData } from './data'
const data: OtherStore = {
  captchaDisable: false,// 短信禁用
  captchaTime: 60,// 短信间隔时间  
  defaultCaptchaTime: 60,// 默认短信间隔时间 用于重置captchaTime
}

export const otherAction: OtherAction = {
  // 获取短信
  getCaptcha: action(async function (this: OtherStore & OtherAction, data: GetCaptchaData) {
    try {
      // await getCaptcha(data)
      await mockData('data', null)
      this.captchaDisable = true
    } catch (e) {
      console.log(e)
      this.captchaDisable = false
      return Promise.reject(e)
    }
  }),
  // 设置短信时间
  setCaptchaTime: action(async function (this: OtherStore & OtherAction) {
    try {
      while (true) {
        const { captchaTime, captchaDisable } = this
        await delay(1000)
        if (captchaTime! > 0 && captchaDisable) {
          this.captchaTime! -= 1
        } else {
          this.captchaTime = this.defaultCaptchaTime
          this.captchaDisable = false
          return
        }
      }
    } catch (e) {
      console.log(e)
      return Promise.reject(e)
    }
  }),
  initCaptcha: action(function (this: OtherStore & OtherAction) {
    this.captchaTime = this.defaultCaptchaTime
    this.captchaDisable = false
  })
}

/*** 用于与业务无关的信息 如屏幕信息、获取短信的标识 */
export default {
  ...data,
  ...otherAction
} as OtherStore & OtherAction


