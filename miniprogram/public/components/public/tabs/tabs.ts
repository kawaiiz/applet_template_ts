// 获取应用实例
const app = getApp<IAppOption>()
type InitData = {
  IMAGEURL: string,
  tabCurrent: number,
}

type InitProperty = {
  dataList: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  tabTextKey: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  initTabCurrent: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
  backgroundColor: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  color: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  activeColor: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  borderRadius: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  boxShadow: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
}

type InitMethod = {
  handleClickTab(e: GlobalData.WxAppletsEvent): void
  initComponent(): void
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    dataList: {
      type: Array,
      value: []
    },
    tabTextKey: {
      type: String,
      value: ''
    },
    initTabCurrent: {
      type: Number,
      value: 0
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    color: {
      type: String,
      value: '#aaa'
    },
    activeColor: {
      type: String,
      value: '#333'
    },
    borderRadius: {
      type: Boolean,
      value: true
    },
    boxShadow: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    IMAGEURL: app.globalData.IMAGEURL,
    tabCurrent: 0,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tab
    handleClickTab(e) {
      const { tabCurrent } = this.data
      const { index } = e.currentTarget.dataset
      if (tabCurrent === index) return
      this.setData({
        tabCurrent: index
      }, () => {
        this.triggerEvent('changetabcurrent', {
          value: index
        })
      })
    },
    // 初始化选择第几项
    initComponent() {
      const { initTabCurrent } = this.data
      this.setData({
        tabCurrent: typeof initTabCurrent === 'number' ? initTabCurrent : 0
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