const { storeBindingsBehavior } = require('../../../../miniprogram_npm/mobx-miniprogram-bindings/index');
import { globalDataStore, } from '../../../../store/globalData/globalData';
Component({
    behaviors: [storeBindingsBehavior],
    options: {
        multipleSlots: true
    },
    properties: {
        bgColor: {
            type: String,
            value: "#fff"
        },
        contentFull: {
            type: Boolean,
            value: false
        }
    },
    storeBindings: {
        store: globalDataStore,
        fields: {
            pageConfig: () => globalDataStore.pageConfig,
        }
    },
    data: {},
    lifetimes: {},
    attached: function () {
    },
    detached: function () {
    },
    pageLifetimes: {
        show: function () {
        },
        hide: function () {
        },
        resize: function () {
        }
    },
    methods: {}
});
