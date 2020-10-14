const computedBehavior = require('miniprogram-computed')
const { storeBindingsBehavior } = require('mobx-miniprogram-bindings')
import store from '../../store/index/index'
import { otherAction } from '../../store/other/other'
import { OtherAction, OtherStore } from '../../store/other/data'
import { toast } from '../../public/utils/util'

type InitComputed = {
  typeText: string
}

type InitData = { 
  type: boolean
} & InitComputed & OtherStore

type InitProperty = {}

type InitMethod = {
  handleClickCaptcha(): void
  handleChangeType(): void
  onLoad(options: any): void
  onShow(): void
  onReady(): void
} & OtherAction

Component<InitData, InitProperty, InitMethod>({
  behaviors: [computedBehavior, storeBindingsBehavior],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },
  storeBindings: {
    store,
    fields: {
      captchaDisable: () => store.captchaDisable,
      captchaTime: () => store.captchaTime,
    },
    actions: ["getCaptcha", "setCaptchaTime"]
  },
  /**
   * 组件的初始数据
   */
  data: {
    type: false,
    typeText: ''
  },
  computed: {
    typeText(data: InitData & WechatMiniprogram.Component.PropertyOptionToData<InitProperty>) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      // 这个函数的返回值会被设置到 this.data.sum 字段中
      if (data.type) {
        return "type:true"
      } else {
        return "type:false"
      }
    },
  },
  watch: {
    'type': function (_type: string) {
      // 监听this.data.type 
      console.log(_type)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    ...otherAction,
    // 修改登录方式
    handleChangeType() {
      const { type } = this.data
      this.setData({
        type: !type
      })
    },
    // 点击发送短信
    async handleClickCaptcha() {
      try {
        // const { verification, captchaDisable } = this.data
        // if (!verification.mobile.status) {
        //   toast(verification.mobile.message || '请输入正确的手机号码！')
        //   return
        // }
        const { captchaDisable } = this.data
        console.log(captchaDisable)
        if (captchaDisable) return
        const { mobile } = { mobile: '18888888888' }
        await this.getCaptcha({ mobile })

        this.setCaptchaTime()
      } catch (e) {
        console.log(e)
        toast(e.errMsg || '短信发送失败，请稍后重试！')
      }
    },
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