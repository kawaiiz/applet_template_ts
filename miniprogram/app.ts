// app.ts
import { toast, autoUpdate, observe } from './public/utils/util'
import * as config from './public/utils/config'
// import STATIC_DATA from './STATIC_DATA.JSON'

// 刘海屏适配
let pageConfig = require('./public/components/public/navigator_bar/config.js');

import './lodash_init'

App<IAppOption>({
  onLaunch(_option) {
    // 监听store
    this.watchStore()
    
    this.globalData.token = wx.getStorageSync('token') || '';
    //设置顶部导航
    this.setNavStyle()
  },
  onShow() {
    autoUpdate()
  },

  globalData: {
    IMAGEURL: config.IMAGEURL,
    BASEURL: config.BASEURL,
    pageConfig: {
      pixelRate: 0,               //px与rpx换算关系
      platform: '',             //操作平台 用于适配胶囊高度
      capsuleHeight: 0,           //胶囊高度
      statusBarHeight: 0,         //手机顶部状态栏高度
      titleHeight: 0,            //整个导航头高度
      systemHeight: 0,            //手机屏幕高度
      isAllScreen: false,        //是否是全面屏手机
      isHighHead: false,
    },
    watchUserInfoFn: [],
    watchStoreFn: [],
    userInfo: {},
    token: '', //token
    store: {
    },// 公共数据库 
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
  },
  // 监听用户信息变化
  watchUserInfo() {
    observe(this.globalData, 'userInfo', this.globalData.watchUserInfoFn, false)
  },
  // 这里这么写，是要在其他界面监听，而不是在app.js中监听，在userInfo变化时会依次执行里面的函数，有很多函数可能会成为冗余的垃圾信息 but 没处理了
  watchUserInfoFn(method: Function) {
    this.globalData.watchUserInfoFn.push(method)
  },
  // 监听store数据变化
  watchStore() {
    observe(this.globalData, 'store', this.globalData.watchStoreFn, true)
  },
  // 这里这么写，是要在其他界面监听，而不是在app.js中监听，在userInfo变化时会依次执行里面的函数，有很多函数可能会成为冗余的垃圾信息 but 没处理了
  watchStoreFn(method: Function) {
    this.globalData.watchStoreFn.push(method)
  },
  //设置顶部导航相关屏幕参数 以及手机系统
  setNavStyle() {
    try {
      let res = wx.getSystemInfoSync();

      // 设置系统
      this.globalData.phoneSystem = res.platform

      console.log(res)
      pageConfig.pixelRate = res.windowWidth / 750;
      pageConfig.platform = res.platform;
      pageConfig.statusBarHeight = res.statusBarHeight;
      if (res.platform.toLowerCase() == 'android') {
        pageConfig.capsuleHeight += 4;
      }
      pageConfig.titleHeight = (pageConfig.capsuleHeight + pageConfig.statusBarHeight) / pageConfig.pixelRate;
      if (res.statusBarHeight >= 44) {
        pageConfig.isHighHead = true;
      }
      if (res.windowHeight > 750) pageConfig.isAllScreen = true;
      pageConfig.systemHeight = res.windowHeight;
      this.globalData.pageConfig = { ...pageConfig }
    } catch (e) {
      console.log(e);
    }
  }
})