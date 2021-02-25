const { action } = require('mobx-miniprogram')
// mockData
import { setNavStyle, } from '../../public/utils/util'
import { getUserInfo, loginMobile, loginWorkNumber, resetToken, } from './service'
import { GlobalDataStore, GlobalDataAction, UserInfo, LoginWorkNumberData, LoginMobileData, } from './data'
import { mockData, gotoLogin } from '../../public/utils/util'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../public/utils/config'
// import { value } from './mock'
const data: GlobalDataStore = {
  cMain: "#687CEE",
  loginFlag: 0,// 是否登录 0 未判断/ 1 已登录/ 2 未登录
  token: "",// token
  userInfo: {
    // id:number,
    // avatar: "", // 头像
    // mobile: "",// 手机号
    // wx: "",// wx号
    // wxQR: "",//wx 二维码
    // username: "",// 用户昵称
    // role: "",// 角色
    // department: "",// 部门
    // position: "",// 岗位 
    // workNumber: "",// 工号
    // tag: "", // 荣誉等级
    // campus: [],// 校区
  } as UserInfo,// 用户信息
  pageConfig: setNavStyle(),// 屏幕参数
}

export const globalAction: GlobalDataAction = {

  getGlobalData: action(async function (this: GlobalDataStore & GlobalDataAction) {
    try {
      // 这里放全局的参数
      await Promise.all([])
    } catch (e) {
      console.log(e)
    }
  }),
  // 有确认有效的token后请求全局数据 如 获取药品开发状态列表
  initGlobalData: action(async function (this: GlobalDataStore & GlobalDataAction) {
    await Promise.all([this.getGlobalData()])
  }),
  // 获取用户信息 如果过期 则要前往登录 没过期就前往首页
  getUserInfo: action(async function (this: GlobalDataStore & GlobalDataAction) {
    try {
      // const res = await getUserInfo()
      const res = await mockData('data', {})
      this.userInfo = res.data
    } catch (e) {
      console.log(e)
    }
  }),
  // 每次初始化store里的token就重新请求一遍基础信息 ,一进小程序storage里有token/正常登录/ 重新登录才会到这里  token更新每次都重新请求一遍
  setToken: action(async function (this: GlobalDataStore & GlobalDataAction, token: string, refresh_token?: string) {
    this.token = token
    wx.setStorageSync(ACCESS_TOKEN, token)
    if (refresh_token || refresh_token === '') {
      wx.setStorageSync(REFRESH_TOKEN, refresh_token)
    }
  }),
  initApp: action(async function (this: GlobalDataStore & GlobalDataAction,) {
    try {
      if (this.token) {
        await this.getUserInfo() // 先用获取用户信息来校验token是否有效 无效返回启动页
        this.loginFlag = 1 // 登录有效 设置登录位
        this.initGlobalData()
      } else {
        this.loginFlag = 2 // token清除 设置登录位
        // this.login({}, 'mobile') // 正式使用的时候要注释这一步
      }
    } catch (e) {
      console.log(e)
      this.loginFlag = 2 // 设置登录位
      return Promise.reject(e)
    }
  }),
  login: action(async function (this: GlobalDataStore & GlobalDataAction, requestData: LoginWorkNumberData | LoginMobileData, type: 'mobile' | 'workNumber') {
    try {
      let res = null
      if (type === 'mobile') {
        res = await loginMobile(requestData as LoginMobileData)
      } else if (type === 'workNumber') {
        res = await loginWorkNumber(requestData as LoginWorkNumberData)
      }
      console.log(res)
      this.setToken(res!.data.access_token, res!.data.refresh_token)
      await this.initApp()
      return res
    } catch (e) {
      return Promise.reject(e)
    }
  }),
  logout: action(async function (this: GlobalDataStore & GlobalDataAction) {
    try {
      await this.setToken('', '')
      await this.initApp()
      this.userInfo = {} as UserInfo // 用户信息
      gotoLogin()
    } catch (e) {
      console.log(e)
    }
  }),
  resetToken: action(async function (this: GlobalDataStore & GlobalDataAction,) {
    try {
      const res = await resetToken()
      this.setToken(res.data.access_token, res.data.refresh_token)
    } catch (e) {
      console.log(e)
      await this.setToken('', '')
      this.initApp()
      return Promise.reject(e)
    }
  })
}

/*** 用于与业务无关的信息 如屏幕信息、获取短信的标识 */
export default {
  ...data,
  ...globalAction
} as GlobalDataStore & GlobalDataAction

