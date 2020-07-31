const { observable, action } = require('mobx-miniprogram')
import { setNavStyle, delay } from '../public/utils/util'
import { GetCaptchaData } from '../service/other'
// import { getCaptcha, GetCaptchaData } from '../service/other'

// store数据 加问号  可以与页面内的initData做合集 使用
export interface OtherStore {
  pageConfig?: GlobalData.PageConfig,
  captchaDisable?: boolean,
  captchaTime?: number,
  defaultCaptchaTime?: number
}

// action动作
export type OtherAction = {
  getCaptcha(data: GetCaptchaData): void,
  setCaptchaTime(): void
}

const data = {
  pageConfig: setNavStyle(),// 页面参数
  captchaDisable: false,// 短信禁用
  captchaTime: 60,// 短信间隔时间
  defaultCaptchaTime: 60,// 默认短信间隔时间 用于重置captchaTime
}

export const dataAction = {
  getCaptcha: action(async function (this: any, _data: GetCaptchaData) {
    try {
      // await getCaptcha(data)
      this.captchaDisable = true
      return Promise.resolve()
    } catch (e) {
      console.log(e)
      this.captchaDisable = false
      return Promise.reject(e)
    }
  }),
  setCaptchaTime: action(async function (this: OtherStore & OtherAction) {
    try {
      while (true) {
        console.log(this)
        const { captchaTime } = this
        await delay(1000)
        if (captchaTime! > 0) {
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
  })
}

/** 用于与业务无关的信息 如屏幕信息、获取短信的标识 */
export const store: OtherStore & OtherAction = observable({
  ...data,
  ...dataAction
})

