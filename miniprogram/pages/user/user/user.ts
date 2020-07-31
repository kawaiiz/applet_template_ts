import { debounce } from 'lodash'
// import { toast } from '../../../public/utils/util';

// 获取应用实例
const app = getApp<IAppOption>()

interface InitPage {
  gotoPage(e: any): void,
  getWXUserInfo(e: any): void,
  setUserInfo(userInfo: GlobalData.UserInfo | {}): void
  initPage(): void
}

interface InitData {
  IMAGEURL: string,
  userInfo: GlobalData.UserInfo | {},
}

Page<InitData, InitPage>({

  /**
   * 页面的初始数据
   */
  data: {
    IMAGEURL: app.globalData.IMAGEURL,
    userInfo: {},
  },
  // 获取微信信息
  getWXUserInfo: debounce(async function (this: WechatMiniprogram.Page.Instance<InitData, InitPage>, e: any) {
    console.log(e)
    const { userInfo } = e.detail
    if (userInfo) {
      const { avatarUrl, nickName, gender } = userInfo
      const oldAvatar = (this.data.userInfo as GlobalData.UserInfo).avatarUrl
      // 这里可以向后台发请求  更新头像
      if (!oldAvatar || oldAvatar !== avatarUrl) {
        app.globalData.userInfo = { ...app.globalData.userInfo, avatarUrl, nickName, gender }
      }
      this.gotoPage(e)
    }
  }, 1000, {
    leading: true,
    trailing: false
  }),
  gotoPage(e: any) {
    const { url } = e.currentTarget.dataset
    if (url) {
      wx.navigateTo({
        url
      })
    }
  },
  setUserInfo(userInfo) {
    this.setData({
      userInfo
    })
  },
  initPage() {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initPage()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})

export { };
