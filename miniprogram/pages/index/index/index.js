const app = getApp();
Page({
    data: {
        BASEURL: app.globalData.BASEURL,
        IMAGEURL: app.globalData.IMAGEURL,
    },
    onLoad: function () {
    },
    onReady: function () {
    },
    onShow: function () {
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
        const { transmit } = app.globalData;
        return transmit;
    }
});
