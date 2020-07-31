// 获取应用实例
const app = getApp<IAppOption>()

interface InitPage {

}

interface InitData {
  IMAGEURL: string,
}

Page<InitData, InitPage>({

  /**
   * 页面的初始数据
   */
  data: {
    IMAGEURL: app.globalData.IMAGEURL
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (_options: any) {
    console.log(_options)
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
  // onShareAppMessage: function () {

  // }
})

export { };
