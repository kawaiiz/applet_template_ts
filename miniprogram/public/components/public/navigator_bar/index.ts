// public/components/navigator_bar/index.js
const { storeBindingsBehavior } = require('../../../../miniprogram_npm/mobx-miniprogram-bindings/index')
import store from '../../../../store/index/index'
import { GlobalDataStore } from '../../../../store/globalData/data'

type InitData = {} & GlobalDataStore

type InitProperty = {
  bgColor: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  contentFull: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  longCenter: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  nobgcontent: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
}

type InitMethod = {
}


Component<InitData, InitProperty, InitMethod>({
  behaviors: [storeBindingsBehavior],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String,
      value: "#fff"
    },
    contentFull: {
      type: Boolean,
      value: false
    },
    longCenter: {
      type: Boolean,
      value: false
    },
    nobgcontent: {
      type: Boolean,
      value: false
    }
  },
  storeBindings: {
    store,
    fields: {
      pageConfig: (store: GlobalDataStore) => store.pageConfig,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  lifetimes: {

  },
  attached: function () {
  },
  detached: function () {

  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    // resize: function (_size) {
    resize: function () {
      // 页面尺寸变化
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {}
})

export { }