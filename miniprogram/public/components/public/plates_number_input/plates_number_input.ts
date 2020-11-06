const computedBehavior = require('miniprogram-computed')

type InitData = {
  inputValue: (string | undefined)[],
  currentIndex: number,
  typewritingShow: boolean
}

type InitProperty = {
  initData: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  initTypewritingShow: WechatMiniprogram.Component.FullProperty<ObjectConstructor>,
}

type InitMethod = {
  handleChangeCurrentIndex(e: GlobalData.WxAppletsEvent): void,
  handleClickTypewritingKey(e: GlobalData.WxAppletsEvent): void,
  handleClickTypewritingClose(e: GlobalData.WxAppletsEvent): void,
  handleClickTypewritingDel(e: GlobalData.WxAppletsEvent): void,
  triggerEventValue(): void
  initComponent(): void
  catchTap(): void
}


Component<InitData, InitProperty, InitMethod>({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Array,
      value: new Array(8).fill(undefined)
    },
    initTypewritingShow: {
      type: Object,
      value: {
        value: false
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: new Array(8).fill(undefined),
    currentIndex: -1,
    typewritingShow: false
  },
  watch: {
    'initData': function (initData: (string | undefined)[]) {
      // 避免传过来的车牌号长度不足8位
      const newInputValue = initData.length === 8 ? initData : new Array(8).fill(undefined).map((_item, index) => {
        if (initData[index]) return initData[index]
        else return undefined
      })
      this.setData({
        inputValue: newInputValue
      })
    },
    'initTypewritingShow': function (initTypewritingShow: { value: boolean }) {
      // 监听this.data.type 
      this.setData({
        currentIndex: initTypewritingShow && initTypewritingShow.value ? 0 : -1
      })
    },
  },
  computed: {
    typewritingShow(data: InitData & WechatMiniprogram.Component.PropertyOptionToData<InitProperty>) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      return data.currentIndex !== -1
    },
    keyType(data: InitData & WechatMiniprogram.Component.PropertyOptionToData<InitProperty>) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      return data.currentIndex === 0 ? 'zh' : 'en'
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    catchTap() { },
    // 更改需要修改的项
    handleChangeCurrentIndex(e) {
      this.setData({
        currentIndex: e.detail.value
      })
    },
    // 点击键盘输入事件
    handleClickTypewritingKey(e) {
      const { value } = e.detail
      const { currentIndex, inputValue } = this.data
      const key = `inputValue[${currentIndex}]`
      this.setData({
        [key]: value.value,
        currentIndex: currentIndex < inputValue.length - 1 ? currentIndex + 1 : currentIndex
      }, () => {
        this.triggerEventValue()
      })

    },
    // 键盘删除事件
    handleClickTypewritingDel(_e) {
      const { currentIndex } = this.data
      const key = `inputValue[${currentIndex}]`
      this.setData({
        [key]: null
      }, () => {
        this.triggerEventValue()
      })
    },
    // 修改数据事件传出去
    triggerEventValue() {
      const { inputValue } = this.data
      const value = inputValue.reduce((total, item) => total + (item || ' '), '') || '';
      this.triggerEvent('changeplatesnumber', {
        value: {
          value,
          valueArr: inputValue
        }
      })
    },
    // 键盘关闭事件  这里用了计算属性 所以设置选择项index就可以关闭
    handleClickTypewritingClose(_e) {
      this.setData({
        currentIndex: -1
      })
    },
    // 根据初始值初始化组件
    initComponent() {
      const { initData, initTypewritingShow } = this.data
      this.setData({
        inputValue: initData,
        typewritingShow: initTypewritingShow ? initTypewritingShow.value : false
      })
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () {
      this.initComponent()
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