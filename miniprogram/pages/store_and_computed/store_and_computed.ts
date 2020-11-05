const computedBehavior = require('miniprogram-computed')
const { storeBindingsBehavior } = require('mobx-miniprogram-bindings')
import store from '../../store/index/index'
import { otherAction } from '../../store/other/other'
import { OtherAction, OtherStore } from '../../store/other/data'
import { toast } from '../../public/utils/util'
import { dataCheck, dataCheckItem } from '../../public/components/public/form/ts/form_verification'
import { Rules, FormItemError } from '../../public/components/public/form/ts/data'
import { debounce } from 'lodash'
// 获取应用实例
const app = getApp<IAppOption>()

type InitComputed = {
  typeText: string
}

type InitData = {
  BASEURL: string,
  IMAGEURL: string,
  requestData: any,
  type: boolean,
  rules: Rules,
  rangeList: any[],
  error: {
    [key: string]: FormItemError
  },
} & InitComputed & OtherStore

type InitProperty = {}

type InitMethod = {
  handleChangePicker(e: GlobalData.WxAppletsEvent): void,
  handleChangeInput(e: GlobalData.WxAppletsEvent): void,
  handleChangeImages(e: GlobalData.WxAppletsEvent): void,
  handleChangeUpdataLoading(e: GlobalData.WxAppletsEvent): void
  handleSubmit(): void,
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
    BASEURL: app.globalData.BASEURL,
    IMAGEURL: app.globalData.IMAGEURL,
    requestData: {},
    type: false,
    typeText: '',
    rangeList: [{
      id: 1, name: '类型一'
    }, {
      id: 2, name: '类型二'
    }, {
      id: 3, name: '类型三'
    }],
    rules: {
      name: {
        required: true,
        type: 'string',
        message: '请输入活动名称~'
      },
      typeId: {
        required: true,
        message: '请选择支出类型~'
      },
      date: {
        required: true,
        message: '请选择支出日期~'
      },
      money: {
        required: true,
        type: 'number',
        message: '请输入实际支出数额~'
      }
    },
    error: {},
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
    // 输入文字事件
    handleChangeInput: debounce(function (this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod, {}>, e: GlobalData.WxAppletsEvent,) {
      const { rules } = this.data
      const { key } = e.currentTarget.dataset
      const { value } = e.detail
      this.setData({
        [`requestData.${key}`]: value,
        [`error.${key}`]: dataCheckItem(rules[key], value, key)
      })
    }, 200, {
      leading: false,
      trailing: true
    }),
    handleChangePicker(e) {
      console.log(e)
      const { rules } = this.data
      const { key } = e.currentTarget.dataset
      const { value } = e.detail
      let newValue = null
      const setData: { [key: string]: any } = {}
      if (key === 'typeId') {
        const { rangeList } = this.data
        newValue = rangeList && rangeList[value].id
      } else if (key === 'date') {
        newValue = value
      }
      setData[`requestData.${key}`] = newValue;
      setData[`error.${key}`] = dataCheckItem(rules[key], newValue, key);
      this.setData(setData)
    },
    // 上传图片 删除图片
    handleChangeImages(e) {
      this.setData({
        'requestData.images': e.detail.value,
      })
    },
    // 上传图片设置禁止提交
    handleChangeUpdataLoading(e) {
      this.setData({
        upDataLoading: e.detail.value
      })
    },
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
        toast(e.errMsg || '短信发送失败，请稍后重试！')
      }
    },
    //  提交
    handleSubmit: debounce(function (this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod>) {
      try {
        const { requestData, rules } = this.data
        const check = dataCheck(rules, requestData)
        console.log(check)
        if (check.errorArr.length > 0) {
          this.setData({
            error: check.errorObj
          })
        }
      } catch (e) {

      }
    }, 200, {
      leading: false,
      trailing: true
    }),
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