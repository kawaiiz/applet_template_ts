const computedBehavior = require('miniprogram-computed')

import { ShowListItem, ValueListItem } from './data'
import { IRes } from '../../../utils/http'
import { gotoLogin, toast } from '../../../utils/util'


type InitData = {
  showList: ShowListItem[],// 用于显示用的数组
  valueList: ValueListItem[],// 用于传给父组件的数组 存的是返回的信息
  disabled: boolean,// 上传时需要禁用上传按钮
}

type InitProperty = {
  BASEURL: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  token: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  upFileUrl: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  imageList: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  maxLength: WechatMiniprogram.Component.FullProperty<NumberConstructor>,
}

type InitMethod = {
  handleClickSeeImage(e: GlobalData.WxAppletsEvent): void,
  handleClickDel(e: GlobalData.WxAppletsEvent): void,
  handleClickAdd(): void,
  upImageAll(tempFilePaths: string[]): void,
  upImage(tempFilePath: string): Promise<{ showListItem: ShowListItem, valueListItem?: any }>,
  handleDownloadData(data: { showListItem: ShowListItem, valueListItem?: any }[]): void,
  handleChangeValueList(): void,
  handleChangeDisabled(): void,
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
    BASEURL: {
      type: String,
      value: ''
    },// 域名  如果返回的url是截取的 需要自己拼接一下
    upFileUrl: {
      type: String,
      value: ''
    },// 上传图片的地址
    imageList: {
      type: Array,
      value: []
    },// 默认的图片
    maxLength: {
      type: Number,
      value: 1000000
    },// 最大上传数量
    token: {
      type: String,
      value: ''
    },// 最大上传数量
  },
  watch: {
    // 初始化组件  有传值说明需要回填数据
    imageList(this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod>, imageList: any[]) {
      const { BASEURL } = this.data
      const newShowList: ShowListItem[] = []
      const newValueList: any[] = []
      imageList.forEach(item => {
        if (typeof item === 'object') {
          newShowList.push({
            ...item,
            path: (item.path as string).indexOf(BASEURL) !== -1 ? item.path : `${BASEURL}${item.path}`,
            error: false
          })
          newValueList.push(item)
        } else if (typeof item === 'string') {
          newShowList.push({
            path: item.indexOf(BASEURL) !== -1 ? item : `${BASEURL}${item}`,
            error: false
          })
          newValueList.push({
            path: item
          })
        }
      })
      this.setData({
        showList: newShowList,
        valueList: newValueList
      })
    },
    valueList(this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod>, _valueList: any[]) {
      this.handleChangeValueList()
    },
    disabled(this: WechatMiniprogram.Component.Instance<InitData, InitProperty, InitMethod>, _disabled: boolean) {
      this.handleChangeDisabled()
    },
    showList(this: any, showList: any) {
      console.log(showList)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    showList: [],// 用于显示用的数组
    valueList: [],// 用于传给父组件的数组
    disabled: false,// 上传时需要禁用上传按钮
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击查看大图
    handleClickSeeImage(e) {
      const { showList } = this.data
      const { index } = e.currentTarget.dataset
      const arr = showList.map(item => item.path)
      wx.previewImage({
        current: arr[index],
        urls: arr
      })
    },
    // 点击删除
    handleClickDel(e) {
      const { index } = e.currentTarget.dataset
      const { showList, valueList } = this.data
      const newShowList = [...showList]
      const newValueList = [...valueList]
      newShowList.splice(index, 1)
      newValueList.splice(index, 1)
      this.setData({
        showList: newShowList,
        valueList: newValueList
      })
    },
    // 点击添加图片
    handleClickAdd() {
      const { maxLength, showList } = this.data
      const surplusNum = maxLength - showList.length
      wx.chooseImage({
        count: surplusNum > 9 ? 9 : surplusNum, // 默认9
        sourceType: ['camera', "album"], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          this.upImageAll(res.tempFilePaths)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    // promise all 控制请求提示
    async upImageAll(tempFilePaths) {
      try {
        wx.showLoading({
          title: '请等待',
        })
        this.setData({
          disabled: true
        })
        const requestList: Promise<{ showListItem: ShowListItem, valueListItem?: any }>[] = []
        tempFilePaths.forEach((item) => {
          requestList.push(this.upImage(item))
        })
        const res = await Promise.all(requestList)
        this.handleDownloadData(res)
        this.setData({
          disabled: false
        })
        wx.hideLoading()
      } catch (e) {
        console.log(e)
      }
    },
    // 单个上传主体
    upImage(tempFilePath) {
      const { token, upFileUrl } = this.data
      return new Promise((resolve) => {
        wx.uploadFile({
          url: upFileUrl,
          filePath: tempFilePath,
          name: 'file',
          header: {
            token,
          },
          formData: {
            token
          },
          success: (res) => {
            let data: IRes<any> = JSON.parse(res.data)
            if (data.code === 1) {
              resolve({
                showListItem: {
                  error: false,
                  path: data.data.path
                },
                valueListItem: {
                  ...data.data,
                  path: data.data.path
                }
              })
            } else if (data.code === 0) {
              resolve({
                showListItem: {
                  error: true,
                  path: data.data.path
                }
              })
            } else if (data.code === 2) {
              toast({
                title: data.errMsg || '登录失效，请重新登录',
                cb: gotoLogin
              })
            }
          },
          fail: (err) => {
            console.log(err)
            resolve({
              showListItem: {
                error: true,
                path: tempFilePath
              }
            })
          }
        })
      })
    },
    // 处理上传后的数据
    handleDownloadData(data) {
      const { showList, valueList } = this.data
      const newShowList: ShowListItem[] = [...showList]
      const newValueList: any[] = [...valueList]
      data.forEach((item, index) => {
        const successIndex = index + valueList.length
        if (item.showListItem.error) {
          newShowList[successIndex] = item.showListItem
          newValueList[successIndex] = null
        } else {
          newShowList[successIndex] = item.showListItem
          newValueList[successIndex] = item.valueListItem
        }
      })
      this.setData({
        showList: newShowList,
        valueList: newValueList
      })
    },
    //侦听图片数量变化触发函数
    handleChangeValueList() {
      this.triggerEvent('changevaluelist', {
        valueList: this.data.valueList.filter(item => !!item)
      })
    },
    //侦听上传事件 触发disabled事件
    handleChangeDisabled() {
      this.triggerEvent('changedisabled', {
        disabled: this.data.disabled
      })
    },
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },
})

export { }