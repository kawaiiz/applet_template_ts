// public/components/public/navigator_btn/index.js
type InitData = {}

type InitProperty = {
  type: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  homepage: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  color: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  showLeft:WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  showRight:WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
}

type InitMethod = {
}

Component<InitData, InitProperty, InitMethod>({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: "all"
    },
    homepage: {
      type: String,
      value: ""
    },
    color: {
      type: String,
      value: "#333"
    },
    showLeft: {
      type: Boolean,
      value: true
    },
    showRight: {
      type: Boolean,
      value: true
    }
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

  }
})

export { }