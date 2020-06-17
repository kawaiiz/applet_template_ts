// public/components/up_img/up_img.js
const app = getApp()
const util = require('../../../utils/util');

interface InitData { }

// interface InitProperty { }

interface InitMethod {
  [methodName: string]: (...arg: any) => any
}

Component<InitData, any, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //存储图片的返回信息
    // valueList: {
    //   type: Array,
    //   value: [],
    //   observer: 'changeImgArr'
    // },
    // disabled: {
    //   type: Boolean,
    //   value: false,
    //   observer: 'changeDisabled'
    // },
    imgList: { //存储图片
      type: Array,
      value: []
    },
    maxLength: {
      type: Number,
      value: 1000000
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    BASEURL: app.globalData.BASEURL,
    IMAGEURL: app.globalData.IMAGEURL,
    valueList: [],
    disabled: false,
    token: ''
  },
  observers: {
    'valueList.**': function () {
      this.changeImgArr()
    },
    'disabled': function () {
      this.changeDisabled()
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.setData({
        imgList: [],
        valueList: []
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      this.setData({
        imgList: [],
        valueList: []
      })
    },
  },

  pageLifetimes: {
    show: function () {
      // 页面被展示
    },
    hide: function () {
      // 页面被隐藏
    },
    // resize: function (size) {
    //   // 页面尺寸变化
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setImg() {
      const { maxLength, imgList } = this.data
      const nowCount = maxLength - imgList.length
      console.log(maxLength, imgList, nowCount)
      wx.chooseImage({
        count: nowCount > 9 ? 9 : nowCount, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera', "album"], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

          const { imgList, maxLength, valueList } = this.data
          if (imgList.length + res.tempFilePaths.length > maxLength) {
            util.toast({
              title: `最多上传${maxLength}张照片`
            })
          } else {
            wx.showLoading({
              title: '请等待',
            })
            const token = wx.getStorageSync('token')
            this.setData({
              token
            }, () => {
              let arr = []
              for (let i = 0; i < res.tempFilePaths.length; i++) {
                arr.push(this.upImg(res.tempFilePaths[i], i + valueList.length))
              }
              Promise.all(arr).then(() => {
                wx.hideLoading()
              }).catch(err => {
                console.log(err)
                wx.hideLoading()
              })
            })
          }
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    //上传图片
    upImg(tempFilePaths, i) {
      let _this = this
      return new Promise((resolve) => {
        let del = 'imgList[' + i + '].del'
        let error = 'imgList[' + i + '].error'
        let str = 'valueList[' + i + ']'
        let imgStr = 'imgList[' + i + '].path'
        const { token, BASEURL } = this.data
        wx.uploadFile({
          url: `${BASEURL}/xcx/file/upload`, //仅为示例，非真实的接口地址
          filePath: tempFilePaths,
          name: 'file',
          header: {
            'XToken': `Bearer ${token}`
          },
          success: (res) => {
            let data = JSON.parse(res.data)
            // data ={code:200,data: {id:1,filePath:''}}
            if (data.code === 200) {
              _this.setData({
                [imgStr]: data.data.path,
                [str]: data.data.id,
                [del]: true,
                [error]: false
              })
            } else if (data.code === 0) {
              util.toast({
                title: data.msg
              })
            } else if (data.code === 2) {
              wx.removeStorage({
                key: 'token'
              })
              app.globalData.token = ''
              app.globalData.userInfo = {}
              util.toast({
                title: data.msg || "当前登录信息已经失效，请重新授权登录",
                cb: () => {
                  setTimeout(function () {
                    wx.reLaunch({
                      url: '/pages/login/login'
                    })
                  }, 1500)
                }
              })
            }
          },
          fail() {
            _this.setData({
              [imgStr]: tempFilePaths,
              [str]: "",
              [del]: true,
              [error]: true
            })
          },
          complete() {
            _this.setData({
              disabled: false
            })
            resolve()
          }
        })
      })
    },
    // 预览图片
    seeImg(e) {
      const { imgList } = this.data
      let index = e.currentTarget.dataset.index
      console.log(imgList)
      let showList = []
      for (let i = 0; i < imgList.length; i++) {
        showList.push(app.globalData.BASEURL + imgList[i].path)
      }
      wx.previewImage({
        current: showList[index], // 当前显示图片的http链接
        urls: showList // 需要预览的图片http链接列表
      })
    },
    delImg(e) {
      const { imgList, valueList } = this.data
      let index = e.currentTarget.dataset.index
      let loaclvalueList = [...valueList]
      let loaclImgList = [...imgList]
      loaclImgList.splice(index, 1)
      loaclvalueList.splice(index, 1)
      this.setData({
        imgList: loaclImgList,
        valueList: loaclvalueList
      })
    },
    //侦听图片数量变化触发函数
    changeImgArr() {
      const { valueList } = this.data
      let value = valueList.filter((item: number) => typeof item === 'number')
      console.log(value)
      this.triggerEvent('setImg', {
        imgList: value
      })
    },
    //侦听上传事件 触发disabled事件
    changeDisabled() {
      this.triggerEvent('setDisabled', {
        disabled: this.data.disabled
      })
    }
  }
})
