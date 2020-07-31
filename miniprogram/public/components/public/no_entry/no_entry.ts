
type InitData = {}

type InitProperty = {}

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

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options: any) {
      console.log(options)
    },
    onShow() {
      console.log('onShow')
    },
    onReady() {
      console.log('onReady')
    },
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