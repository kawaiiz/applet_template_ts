"use strict";
const app = getApp();
const util = require('../../../utils/util');
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        imgList: {
            type: Array,
            value: []
        },
        maxLength: {
            type: Number,
            value: 1000000
        }
    },
    data: {
        BASEURL: app.globalData.BASEURL,
        IMAGEURL: app.globalData.IMAGEURL,
        valueList: [],
        disabled: false,
        token: ''
    },
    observers: {
        'valueList.**': function () {
            this.changeImgArr();
        },
        'disabled': function () {
            this.changeDisabled();
        }
    },
    lifetimes: {
        attached: function () {
            this.setData({
                imgList: [],
                valueList: []
            });
        },
        detached: function () {
            this.setData({
                imgList: [],
                valueList: []
            });
        },
    },
    pageLifetimes: {
        show: function () {
        },
        hide: function () {
        },
    },
    methods: {
        setImg() {
            const { maxLength, imgList } = this.data;
            const nowCount = maxLength - imgList.length;
            console.log(maxLength, imgList, nowCount);
            wx.chooseImage({
                count: nowCount > 9 ? 9 : nowCount,
                sizeType: ['compressed'],
                sourceType: ['camera', "album"],
                success: (res) => {
                    const { imgList, maxLength, valueList } = this.data;
                    if (imgList.length + res.tempFilePaths.length > maxLength) {
                        util.toast({
                            title: `最多上传${maxLength}张照片`
                        });
                    }
                    else {
                        wx.showLoading({
                            title: '请等待',
                        });
                        const token = wx.getStorageSync('token');
                        this.setData({
                            token
                        }, () => {
                            let arr = [];
                            for (let i = 0; i < res.tempFilePaths.length; i++) {
                                arr.push(this.upImg(res.tempFilePaths[i], i + valueList.length));
                            }
                            Promise.all(arr).then(() => {
                                wx.hideLoading();
                            }).catch(err => {
                                console.log(err);
                                wx.hideLoading();
                            });
                        });
                    }
                },
                fail: function (err) {
                    console.log(err);
                }
            });
        },
        upImg(tempFilePaths, i) {
            let _this = this;
            return new Promise((resolve) => {
                let del = 'imgList[' + i + '].del';
                let error = 'imgList[' + i + '].error';
                let str = 'valueList[' + i + ']';
                let imgStr = 'imgList[' + i + '].path';
                const { token, BASEURL } = this.data;
                wx.uploadFile({
                    url: `${BASEURL}/xcx/file/upload`,
                    filePath: tempFilePaths,
                    name: 'file',
                    header: {
                        'XToken': `Bearer ${token}`
                    },
                    success: (res) => {
                        let data = JSON.parse(res.data);
                        if (data.code === 200) {
                            _this.setData({
                                [imgStr]: data.data.path,
                                [str]: data.data.id,
                                [del]: true,
                                [error]: false
                            });
                        }
                        else if (data.code === 0) {
                            util.toast({
                                title: data.msg
                            });
                        }
                        else if (data.code === 2) {
                            wx.removeStorage({
                                key: 'token'
                            });
                            app.globalData.token = '';
                            app.globalData.userInfo = {};
                            util.toast({
                                title: data.msg || "当前登录信息已经失效，请重新授权登录",
                                cb: () => {
                                    setTimeout(function () {
                                        wx.reLaunch({
                                            url: '/pages/login/login'
                                        });
                                    }, 1500);
                                }
                            });
                        }
                    },
                    fail() {
                        _this.setData({
                            [imgStr]: tempFilePaths,
                            [str]: "",
                            [del]: true,
                            [error]: true
                        });
                    },
                    complete() {
                        _this.setData({
                            disabled: false
                        });
                        resolve();
                    }
                });
            });
        },
        seeImg(e) {
            const { imgList } = this.data;
            let index = e.currentTarget.dataset.index;
            console.log(imgList);
            let showList = [];
            for (let i = 0; i < imgList.length; i++) {
                showList.push(app.globalData.BASEURL + imgList[i].path);
            }
            wx.previewImage({
                current: showList[index],
                urls: showList
            });
        },
        delImg(e) {
            const { imgList, valueList } = this.data;
            let index = e.currentTarget.dataset.index;
            let loaclvalueList = [...valueList];
            let loaclImgList = [...imgList];
            loaclImgList.splice(index, 1);
            loaclvalueList.splice(index, 1);
            this.setData({
                imgList: loaclImgList,
                valueList: loaclvalueList
            });
        },
        changeImgArr() {
            const { valueList } = this.data;
            let value = valueList.filter((item) => typeof item === 'number');
            console.log(value);
            this.triggerEvent('setImg', {
                imgList: value
            });
        },
        changeDisabled() {
            this.triggerEvent('setDisabled', {
                disabled: this.data.disabled
            });
        }
    }
});
