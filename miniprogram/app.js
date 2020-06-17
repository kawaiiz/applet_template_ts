import { toast, autoUpdate, observe } from './public/utils/util';
import * as config from './public/utils/config';
let pageConfig = require('./public/components/public/navigator_bar/config.js');
import './lodash_init';
App({
    onLaunch(_option) {
        this.watchStore();
        this.globalData.token = wx.getStorageSync('token') || '';
        this.setNavStyle();
    },
    onShow() {
        autoUpdate();
    },
    globalData: {
        IMAGEURL: config.IMAGEURL,
        BASEURL: config.BASEURL,
        pageConfig: {
            pixelRate: 0,
            platform: '',
            capsuleHeight: 0,
            statusBarHeight: 0,
            titleHeight: 0,
            systemHeight: 0,
            isAllScreen: false,
            isHighHead: false,
        },
        watchUserInfoFn: [],
        watchStoreFn: [],
        userInfo: {},
        token: '',
        store: {},
        transmit: {
            imageUrl: config.IMAGEURL + 'cover_new.png',
            success: function (res) {
                console.log(res);
                toast({ title: '转发成功' });
            },
            fail: function (res) {
                console.log(res);
            }
        }
    },
    watchUserInfo() {
        observe(this.globalData, 'userInfo', this.globalData.watchUserInfoFn, false);
    },
    watchUserInfoFn(method) {
        this.globalData.watchUserInfoFn.push(method);
    },
    watchStore() {
        observe(this.globalData, 'store', this.globalData.watchStoreFn, true);
    },
    watchStoreFn(method) {
        this.globalData.watchStoreFn.push(method);
    },
    setNavStyle() {
        try {
            let res = wx.getSystemInfoSync();
            this.globalData.phoneSystem = res.platform;
            console.log(res);
            pageConfig.pixelRate = res.windowWidth / 750;
            pageConfig.platform = res.platform;
            pageConfig.statusBarHeight = res.statusBarHeight;
            if (res.platform.toLowerCase() == 'android') {
                pageConfig.capsuleHeight += 4;
            }
            pageConfig.titleHeight = (pageConfig.capsuleHeight + pageConfig.statusBarHeight) / pageConfig.pixelRate;
            if (res.statusBarHeight >= 44) {
                pageConfig.isHighHead = true;
            }
            if (res.windowHeight > 750)
                pageConfig.isAllScreen = true;
            pageConfig.systemHeight = res.windowHeight;
            this.globalData.pageConfig = Object.assign({}, pageConfig);
        }
        catch (e) {
            console.log(e);
        }
    }
});
