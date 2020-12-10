const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {},
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
