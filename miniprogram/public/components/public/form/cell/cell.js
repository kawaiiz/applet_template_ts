const app = getApp();
Component({
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    properties: {
        required: {
            type: Boolean,
            value: false
        },
        key: {
            type: String,
            value: ''
        },
        titleWidth: {
            type: String,
            value: '180rpx'
        },
        border: {
            type: Boolean,
            value: true
        },
        label: {
            type: String,
            value: ''
        },
        lineBreak: {
            type: Boolean,
            value: false
        },
        error: {
            type: Boolean,
            value: false
        },
        errorMessage: {
            type: String,
            value: ''
        },
        errorMessageAlign: {
            type: String,
            value: 'left'
        },
    },
    data: {
        IMAGEURL: app.globalData.IMAGEURL,
    },
    methods: {},
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
export {};
