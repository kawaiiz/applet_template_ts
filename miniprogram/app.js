var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toast, autoUpdate, } from './public/utils/util';
import * as config from './public/utils/config';
import './lodash_init';
import store from './store/index/index';
App({
    onLaunch(_option) {
        this.checkLogin();
    },
    onShow() {
        autoUpdate();
    },
    checkLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            const token = wx.getStorageSync(config.ACCESS_TOKEN) || '';
            const refreshToken = wx.getStorageSync(config.REFRESH_TOKEN) || '';
            yield store.setToken(token, refreshToken);
            yield store.initApp();
        });
    },
    globalData: {
        IMAGEURL: config.IMAGEURL,
        BASEURL: config.BASEURL,
        transmit: {
            title: '',
            path: '',
            imageUrl: config.IMAGEURL + 'cover.jpg',
            success: function (res) {
                console.log(res);
                toast({ title: '转发成功' });
            },
            fail: function (res) {
                console.log(res);
            }
        }
    }
});
