const { storeBindingsBehavior } = require('../../../../miniprogram_npm/mobx-miniprogram-bindings/index');
import store from '../../../../store/index/index';
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
        store,
        fields: {
            pageConfig: () => store.pageConfig,
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
