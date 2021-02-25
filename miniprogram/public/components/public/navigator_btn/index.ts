// public/components/public/navigator_btn/index.js
type InitData = {
  pageLength: number // 页面长度
}
// import data from '../../../../app.json'
type InitProperty = {
  type: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  homepage: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  color: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  showLeft: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  showRight: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
}

type InitMethod = {
}

Component<InitData, InitProperty, InitMethod>({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "all"
    },
    homepage: {
      type: String,
      value: "/pages/index/index/index"
    },
    color: {
      type: String,
      value: "#333"
    },
    showLeft: {
      type: Boolean,
      value: true
    },
    showRight: {
      type: Boolean,
      value: true
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    pageLength: 0 // 页面长度
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () {
      this.setData({
        pageLength: getCurrentPages().length
      })
    },
    moved: function () { },
    detached: function () { },
  },
})

export { }