const computedBehavior = require('miniprogram-computed');
const { storeBindingsBehavior } = require('mobx-miniprogram-bindings');
import store from '../../store/index/index';
const app = getApp();
Component({
    behaviors: [storeBindingsBehavior, computedBehavior],
    options: {
        addGlobalClass: true,
    },
    properties: {},
    storeBindings: {
        store,
        fields: {}
    },
    data: {
        IMAGEURL: app.globalData.IMAGEURL,
    },
    computed: {},
    methods: {
        onLoad(options) {
            console.log(options);
        },
        onShow() {
            console.log('onShow');
        },
        onReady() {
            console.log('onReady');
        },
        onShareAppMessage() {
            return app.globalData.transmit;
        }
    },
    lifetimes: {
        attached: function () { },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
