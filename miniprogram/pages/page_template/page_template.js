const computedBehavior = require('miniprogram-computed');
const { storeBindingsBehavior } = require('mobx-miniprogram-bindings');
import { globalDataStore, } from '../../store/globalData/globalData';
const app = getApp();
Component({
    behaviors: [storeBindingsBehavior, computedBehavior],
    options: {
        addGlobalClass: true,
    },
    properties: {},
    storeBindings: {
        store: globalDataStore,
        fields: {
            login: (store) => store.login
        }
    },
    data: {
        IMAGEURL: app.globalData.IMAGEURL,
    },
    computed: {
        typeText(_data) {
            return '123';
        },
    },
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
