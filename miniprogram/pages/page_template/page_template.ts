const computedBehavior = require('miniprogram-computed')
const { storeBindingsBehavior } = require('mobx-miniprogram-bindings')
import { globalDataStore, } from '../../store/globalData/globalData'
import { GlobalDataStore } from '../../store/globalData/data'
// import { gotoLogin } from '../../../public/utils/util'
// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
  IMAGEURL: string,
} & GlobalDataStore

type InitProperty = {}

type InitMethod = {
  onLoad(options: any): void
  onShow(): void
  onReady(): void
  onShareAppMessage(): void
}

Component<InitData, InitProperty, InitMethod>({
  behaviors: [storeBindingsBehavior, computedBehavior],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },
  storeBindings: {
    store: globalDataStore,
    fields: {
      login: (store: GlobalDataStore) => store.login
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    IMAGEURL: app.globalData.IMAGEURL,
  },
  computed: {
    typeText(_data: InitData & WechatMiniprogram.Component.PropertyOptionToData<InitProperty>) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      // 这个函数的返回值会被设置到 this.data.sum 字段中
      return '123'
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options: any) {
      console.log(options)
    },
    onShow() {
      console.log('onShow')
    },
    onReady() {
      console.log('onReady')
    },
    onShareAppMessage() {
      return app.globalData.transmit
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

})

export { }