Component({
    options: {
        addGlobalClass: true,
    },
    properties: {},
    data: {},
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
export {};
