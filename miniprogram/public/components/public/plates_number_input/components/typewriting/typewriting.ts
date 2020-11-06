
type InitData = {
  cityKeyword1: '京沪浙苏粤鲁晋冀豫',
  cityKeyword2: '川渝辽吉黑皖鄂湘赣',
  cityKeyword3: '闽陕甘宁蒙津贵云',
  cityKeyword4: '桂琼青新藏港澳台',
  keyNumber: '1234567890',
  wordList1: 'QWERTYUIOP',
  wordList2: 'ASDFGHJKL',
  wordList3: 'ZXCVBNM',
}

type InitProperty = {
  keyType: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  show: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
}

type InitMethod = {
  handleClick(e: GlobalData.WxAppletsEvent): void
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    keyType: {
      type: String,
      value: 'zh',
    },// zh / en
    show: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cityKeyword1: '京沪浙苏粤鲁晋冀豫',
    cityKeyword2: '川渝辽吉黑皖鄂湘赣',
    cityKeyword3: '闽陕甘宁蒙津贵云',
    cityKeyword4: '桂琼青新藏港澳台',
    keyNumber: '1234567890',
    wordList1: 'QWERTYUIOP',
    wordList2: 'ASDFGHJKL',
    wordList3: 'ZXCVBNM',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件
    handleClick(e) {
      let value = e.currentTarget.dataset.item;
      let type = e.currentTarget.dataset.type;
      switch (value) {
        case 'delete':
          this.triggerEvent('delete');
          break;
        case 'close':
          this.triggerEvent('close');
          break;
        default:
          this.triggerEvent('clickitem', { value: { value, type: type === 1 ? 'zh' : 'en' } });
      }
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