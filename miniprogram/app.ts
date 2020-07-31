// app.ts
import { toast, autoUpdate } from './public/utils/util'
import * as config from './public/utils/config'
import './lodash_init'

App<IAppOption>({
  onLaunch(_option: any) {
    this.globalData.token = wx.getStorageSync('token') || '';
  },
  onShow() {
    autoUpdate()
  },
  globalData: {
    IMAGEURL: config.IMAGEURL,
    BASEURL: config.BASEURL,
    token: '', //token
    transmit: {
      // title: '',
      // path: '',
      imageUrl: config.IMAGEURL + 'cover_new.png',
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