var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _ = require('../../../miniprogram_npm/lodash/index');
const app = getApp();
Page({
    data: {
        IMAGEURL: app.globalData.IMAGEURL,
        userInfo: {},
    },
    getWXUserInfo: _.debounce(function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(e);
            const { userInfo } = e.detail;
            if (userInfo) {
                const { avatarUrl, nickName, gender } = userInfo;
                const oldAvatar = this.data.userInfo.avatarUrl;
                if (!oldAvatar || oldAvatar !== avatarUrl) {
                    app.globalData.userInfo = Object.assign({}, app.globalData.userInfo, { avatarUrl, nickName, gender });
                }
                this.gotoPage(e);
            }
        });
    }, 1000, {
        leading: true,
        trailing: false
    }),
    gotoPage(e) {
        const { url } = e.currentTarget.dataset;
        if (url) {
            wx.navigateTo({
                url
            });
        }
    },
    setUserInfo(userInfo) {
        this.setData({
            userInfo
        });
    },
    initPage() {
    },
    onLoad: function () {
        app.watchUserInfoFn((userInfo) => {
            this.setUserInfo(userInfo);
        });
    },
    onReady: function () {
    },
    onShow: function () {
        this.initPage();
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
});
