import { toast, autoUpdate } from './public/utils/util';
import * as config from './public/utils/config';
import './lodash_init';
App({
    onLaunch(_option) {
        this.globalData.token = wx.getStorageSync('token') || '';
    },
    onShow() {
        autoUpdate();
    },
    globalData: {
        IMAGEURL: config.IMAGEURL,
        BASEURL: config.BASEURL,
        token: '',
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
    }
});
