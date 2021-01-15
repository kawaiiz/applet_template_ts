// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
  IMAGEURL: string,
}

type InitProperty = {
  type: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  size: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
  color: WechatMiniprogram.Component.FullProperty<StringConstructor>
}

type InitMethod = {
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'top'
    },// 'bottom' 'top' 'left' 'right'
    size: {
      type: Number,
      value: 8
    },
    color: {
      type: String,
      value: '#555555'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    IMAGEURL: app.globalData.IMAGEURL,
  },

  /**
   * 组件的方法列表
   */
  methods: {
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