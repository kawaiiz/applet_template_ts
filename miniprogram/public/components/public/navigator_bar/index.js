const { storeBindingsBehavior } = require('../../../../miniprogram_npm/mobx-miniprogram-bindings/index');
import { store } from '../../../../store/other';
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
        console.log(this.data);
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
