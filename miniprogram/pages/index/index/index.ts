// const _ = require('../../../miniprogram_npm/lodash/index');

// 获取应用实例
const app = getApp<IAppOption>()

interface InitPage {

}

interface InitData {
  BASEURL: string,
  IMAGEURL: string,
 
}

Page<InitData, InitPage>({

  /**
   * 页面的初始数据 
   */
  data: {
    BASEURL: app.globalData.BASEURL,// 域名拼接地址
    IMAGEURL: app.globalData.IMAGEURL,// 图片拼接地址
  
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // wx.hideShareMenu()

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
  onShareAppMessage: function () {
    const { transmit } = app.globalData
    return transmit
  }
})

export { };
