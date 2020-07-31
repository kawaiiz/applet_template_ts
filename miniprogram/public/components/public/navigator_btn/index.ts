// public/components/public/navigator_btn/index.js

type InitData = {}

type InitProperty = {
  homepage: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  color: WechatMiniprogram.Component.FullProperty<StringConstructor>,
}
type InitMethod = {
}

Component<InitData, InitProperty, InitMethod>({
  /**
   * 组件的属性列表
   */
  properties: {
    homepage: {
      type: String,
      value: ""
    },
    color: {
      type: String,
      value: "#333"
    },
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