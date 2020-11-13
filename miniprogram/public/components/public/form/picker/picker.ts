const computedBehavior = require('miniprogram-computed')
// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
  IMAGEURL: string,
  _value: any,
  pickerShowData: any,
}

type InitProperty = {
  required: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  key: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  label: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  numberValue: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
  stringValue: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  arrayValue: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
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
  setValue(): void
  createPickerShowData(value: any): string | number | any[]
  handleChangePicker(e: GlobalData.WxAppletsEvent): void
  emitEventChange(value: any): void,
  tipFc(): void
}

Component<InitData, InitProperty, InitMethod>({
  behaviors: [computedBehavior],
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
      value: ''
    },// 标题
    numberValue: {
      type: Number,
      value: undefined
    },// picker的值
    stringValue: {
      type: String,
      value: undefined
    },
    arrayValue: {
      type: Array,
      value: undefined
    },
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
      value: false
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
    _value: null,
    pickerShowData: null,// picker被选中的项的展示值
  },
  watch: {
    'numberValue': function (numberValue: number) {
      // console.log('numberValue:', numberValue)

      this.setValue()
    },
    'stringValue': function (stringValue: string,) {
      // console.log('stringValue:', stringValue)
      this.setValue()
    },
    'arrayValue': function (arrayValue: any[]) {
      // console.log('arrayValue:', arrayValue)
      this.setValue()
    },
    'range': function (range: any[]) {
      this.setValue()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // value 就是 emitEventChange里传到页面的值，当页面初始化时需要调用
    setValue() {
      const { mode, numberValue, stringValue, arrayValue, range } = this.data
      let value
      if (mode === 'selector') {
        if (range.length === 0) return
        value = numberValue
      } else if (mode === 'multiSelector') {
        if (range.length === 0) return
        value = arrayValue
      } else if (mode === 'time') {
        value = stringValue
      } else if (mode === 'date') {
        value = stringValue
      } else if (mode === 'region') {
        if (range.length === 0) return
        value = arrayValue
      }
      this.setData({
        _value: value,
        pickerShowData: this.createPickerShowData(value) || null
      })
    },
    // 根据类型得到picker组件要显示的值
    createPickerShowData(value) {
      const { mode, range } = this.data
      if (mode === 'selector') {
        return range[value]
      } else if (mode === 'multiSelector') {
        return (value as string[]).map((item, index) => {
          return range[index][item]
        })
      } else if (mode === 'time') {
        return value
      } else if (mode === 'date') {
        return value
      } else if (mode === 'region') {
        return value
      }
    },
    handleChangePicker(e) {
      const { value } = e.detail
      let pickerShowData = this.createPickerShowData(value)
      this.setData({
        _value: value,
        pickerShowData
      })
      this.emitEventChange(value)
    },
    emitEventChange(value) {
      this.triggerEvent('change', {
        value,
      })
    },
    tipFc() {
      const { mode, range } = this.data
      if ((mode === 'selector' || mode === 'multiSelector') && !range) {
        console.error('range:普通选择模式、多选模式range字段必填')
      }
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () {
      this.tipFc()
    },
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