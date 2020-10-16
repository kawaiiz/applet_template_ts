const {  action } = require('mobx-miniprogram')
// mockData
import { setNavStyle, } from '../../public/utils/util'
import { getUserInfo } from './service'
import { GlobalDataStore, GlobalDataAction } from './data'
// import { value } from './mock'
const data: GlobalDataStore = {
  loginFlag: 0,// 是否登录 0 未判断/ 1 已登录/ 2 未登录
  token: "",// token
  userInfo: {
    id: NaN,
    mobile: '', // 手机号
    isAuth: false // 是否认证
  },// 用户信息
  pageConfig: setNavStyle(),// 屏幕参数
}

export const globalAction: GlobalDataAction = {
  // 获取用户信息 如果过期 则要前往登录 没过期就前往首页
  getUserInfo: action(async function (this: GlobalDataStore & GlobalDataAction) {
    try {
      const res = await getUserInfo()
      // const res = await mockData('data', {
      //   name: '测试mock'
      // })
      this.userInfo = res.data
    } catch (e) {
      console.log(e)
    }
  }),
  // 有确认有效的token后请求全局数据 
  async initGlobalData() {
    // await Promise.all([this.])
  },
  // 每次初始化store里的token就重新请求一遍基础信息 ,一进小程序storage里有token/正常登录/ 重新登录才会到这里  token更新每次都重新请求一遍
  setToken: action(async function (this: GlobalDataStore & GlobalDataAction, token: string) {
    try {
      this.token = token
      wx.setStorageSync('token', token || '')
      if (token) {
        await this.getUserInfo() // 先用获取用户信息来校验token是否有效 无效返回启动页
        this.loginFlag = 1 // 登录有效 设置登录位
        await this.initGlobalData()
      } else {
        this.loginFlag = 2 // token清除 设置登录位
      }
    } catch (e) {
      console.log(e)
      this.loginFlag = 2 // token清除 设置登录位
    }
  })
}

/** 用于与业务无关的信息 如屏幕信息、获取短信的标识 */
export default {
  ...data,
  ...globalAction
} as GlobalDataStore & GlobalDataAction

