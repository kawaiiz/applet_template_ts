// app.ts
import { toast, autoUpdate, } from './public/utils/util'
import * as config from './public/utils/config'
import './lodash_init'
import store from './store/index/index'

App<IAppOption>({
  onLaunch(_option: any) {
    this.checkLogin()
  },
  onShow() {
    autoUpdate()
  },
  // 检查是否有token 有token就获取用户信息
  async checkLogin() {
    const token = wx.getStorageSync('token') || '';
    await store.setToken(token)
  },
  globalData: {
    IMAGEURL: config.IMAGEURL,
    BASEURL: config.BASEURL,
    transmit: {
      title: '终端开发管理系统',
      path: '/pages/login/startup_page/startup_page',
      imageUrl: config.IMAGEURL + 'cover.jpg',
      success: function (res: any) {
        console.log(res)
        toast({ title: '转发成功' })
      },
      fail: function (res: any) {
        console.log(res)
      }
    }
  }
})