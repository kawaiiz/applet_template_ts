// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
  IMAGEURL: string,
  pickerValue: any
}

type InitProperty = {
  required: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  key: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  label: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  value: WechatMiniprogram.Component.FullProperty<ObjectConstructor>,
  mode: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  border: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  disabled: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  titleWidth: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  inputAlign: WechatMiniprogram.Component.FullProperty<StringConstructor>,

  range: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  rangeKey: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  placeholder: WechatMiniprogram.Component.FullProperty<StringConstructor>,

  start: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  end: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  fields: WechatMiniprogram.Component.FullProperty<StringConstructor>,

  error: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  errorMessage: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  errorMessageAlign: WechatMiniprogram.Component.FullProperty<StringConstructor>,
}

type InitMethod = {
  handleChangePicker(e: GlobalData.WxAppletsEvent): void
  emitEventChange(value: any): void,
  tipFc(): void
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
    }, // 必填
    key: {
      type: String,
      value: undefined
    },// 字段名
    label: {
      type: String,
      value: 'picker标题'
    },// 标题
    value: {
      type: Object,
      value: undefined
    },// picker的值
    mode: {
      type: String,
      value: 'selector'
    },// picker模式
    border: {
      type: Boolean,
      value: true
    },// 是否出现下划线
    disabled: {
      type: Boolean,
      value: true
    },// 禁用
    titleWidth: {
      type: String,
      value: '180rpx'
    }, // 标题宽度
    inputAlign: {
      type: String,
      value: 'left'
    },// 内容的对齐方向
    range: {
      type: Array,
      value: undefined
    },// 普通选择、多选模式下传入的数组
    rangeKey: {
      type: String,
      value: undefined
    },// 普通选择、多选模式下显示被选项文字的字段名

    placeholder: {
      type: String,
      value: '请选择'
    },// 提示文本


    start: {
      type: String,
      value: undefined
    },// 日期、时间模式下
    end: {
      type: String,
      value: undefined
    },// 日期、时间模式下
    fields: {
      type: String,
      value: undefined
    },// 日期、时间模式下 粒度

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
    pickerValue: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChangePicker(e) {
      const { value } = e.detail
      const { range, mode } = this.data
      let pickerValue = null
      if (mode === 'selector') {
        pickerValue = range[value]
      } else if (mode === 'multiSelector') {
        pickerValue = (value as string[]).map((item, index) => {
          return range[index][item]
        })
      } else if (mode === 'time') {
        pickerValue = value
      } else if (mode === 'date') {
        pickerValue = value
      } else if (mode === 'region') {
        pickerValue = value
      }
      this.setData({
        pickerValue
      })
      this.emitEventChange(value)
    },
    emitEventChange(value) {
      this.triggerEvent('change', {
        value
      })
    },
    tipFc() {
      const { mode, range } = this.data
      if ((mode === 'selector' || mode === 'multiSelector') && !range) {
        console.error('普通选择模式、多选模式mode字段必填')
      }
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () { },
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