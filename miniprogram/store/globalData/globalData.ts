const { observable, action } = require('mobx-miniprogram')
// mockData
import { setNavStyle, } from '../../public/utils/util'
import { getUserInfo } from './service'
import { GlobalDataStore, GlobalDataAction } from './data'
// import { value } from './mock'
const data: GlobalDataStore = {
  login: 0,// 是否登录 0 未判断/ 1 已登录/ 2 未登录
  token: "",// token
  userInfo: {
    username: "",
    truename: "",
    area: []
  },// 用户信息
  pageConfig: setNavStyle(),// 屏幕参数
}

export const dataAction: GlobalDataAction = {


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

  // 获取药品开发状态列表
  // getGlobalListData: action(async function (this: GlobalDataStore & GlobalDataAction) {
  //   try {
  //     const res = await getGlobalListData()
  //     const { channel, properties, status } = res.data
  //     this.channelList = channel
  //     this.propertiesList = properties
  //     this.terminalDrugStatusList = status
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }),
  // 有确认有效的token后请求全局数据 如 获取药品开发状态列表
  async initGlobalData() {
    // await Promise.all([this.getGlobalListData()])
  },
  // 每次初始化store里的token就重新请求一遍基础信息 ,一进小程序storage里有token/正常登录/ 重新登录才会到这里  token更新每次都重新请求一遍
  setToken: action(async function (this: GlobalDataStore & GlobalDataAction, token: string) {
    try {
      this.token = token
      wx.setStorageSync('token', token || '')
      if (token) {
        await this.getUserInfo() // 先用获取用户信息来校验token是否有效 无效返回启动页
        this.login = 1 // 登录有效 设置登录位
        await this.initGlobalData()
      } else {
        this.login = 2 // token清除 设置登录位
      }
    } catch (e) {
      console.log(e)
      this.login = 2 // token清除 设置登录位
    }
  })
}

/** 用于与业务无关的信息 如屏幕信息、获取短信的标识 */
export const globalDataStore: GlobalDataStore & GlobalDataAction = observable({
  ...data,
  ...dataAction
})

