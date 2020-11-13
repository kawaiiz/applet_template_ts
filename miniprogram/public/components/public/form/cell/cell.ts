// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
  IMAGEURL: string,
}

type InitProperty = {
  required: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  key: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  label: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  titleWidth: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  border: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  error: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  errorMessage: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  errorMessageAlign: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  lineBreak: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
}

type InitMethod = {

}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    required: {
      type: Boolean,
      value: false
    },
    key: {
      type: String,
      value: ''
    },
    titleWidth: {
      type: String,
      value: '180rpx'
    },
    border: {
      type: Boolean,
      value: true
    },// 是否出现下划线
    label: {
      type: String,
      value: ''
    },
    lineBreak: {
      type: Boolean,
      value: false
    },// 是否换行放东西

    error: {
      type: Boolean,
      value: false
    },// 是否错误
    errorMessage: {
      type: String,
      value: ''
    },// 错误文本
    errorMessageAlign: {
      type: String,
      value: 'left'
    }, // 错误对齐方式 left / right /center
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