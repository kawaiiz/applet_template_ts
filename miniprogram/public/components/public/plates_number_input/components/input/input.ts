
type InitData = {
  currentIndex: number,
}

type InitProperty = {
  inputValue: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  currentIndex: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
  // show: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
}

type InitMethod = {
  handleClickInput(e: GlobalData.WxAppletsEvent): void
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    inputValue: {
      type: Array,
      value: new Array(8).fill(undefined),
    },
    currentIndex: {
      type: Number,
      value: -1,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 修改活跃项
    handleClickInput(e) {
      this.triggerEvent('changecurrentindex', {
        value: e.currentTarget.dataset.index
      })
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