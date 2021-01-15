const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        type: {
            type: String,
            value: 'top'
        },
        size: {
            type: Number,
            value: 8
        },
        color: {
            type: String,
            value: '#555555'
        }
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
