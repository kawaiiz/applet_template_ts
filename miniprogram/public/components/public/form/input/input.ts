// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
  IMAGEURL: string,
}

type InitProperty = {
  required: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  key: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  value: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  type: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  fixed: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  disabled: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  clearable: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  password: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  autoFocus: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  maxlength: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
  cursorSpacing: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
  confirmType: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  titleWidth: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  border: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  inputAlign: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  label: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  placeholder: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  placeholderStyle: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  error: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  errorMessage: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  errorMessageAlign: WechatMiniprogram.Component.FullProperty<StringConstructor>,
}

type InitMethod = {
  handleInput(e: GlobalData.WxAppletsEvent): void,
  handleChange(e: GlobalData.WxAppletsEvent): void,
  handleClickClear(e: GlobalData.WxAppletsEvent): void
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
    label: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: undefined
    },
    type: {
      type: String,
      value: 'text'
    },
    fixed: {
      type: Boolean,
      value: false
    },
    border: {
      type: Boolean,
      value: true
    },// 是否出现下划线
    disabled: {
      type: Boolean,
      value: false
    },
    clearable: {
      type: Boolean,
      value: false
    },
    password: {
      type: Boolean,
      value: false
    },
    titleWidth: {
      type: String,
      value: '180rpx'
    },
    maxlength: {
      type: Number,
      value: -1
    },
    placeholder: {
      type: String,
      value: ''
    },
    placeholderStyle: {
      type: String,
      value: ''
    },

    error: {
      type: Boolean,
      value: false
    },
    errorMessage: {
      type: String,
      value: ''
    },
    errorMessageAlign: {
      type: String,
      value: ''
    },

    inputAlign: {
      type: String,
      value: 'left'
    },

    confirmType: {
      type: String,
      value: '确定'
    },
    cursorSpacing: {
      type: Number,
      value: 50
    },
    autoFocus: {
      type: Boolean,
      value: false
    },


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
    handleInput(e) {
      this.triggerEvent('input', {
        value: e.detail
      })
    },
    handleChange(e) {
      this.triggerEvent('change', {
        value: e.detail
      })
    },
    handleClickClear(_e) {
      this.triggerEvent('clear')
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