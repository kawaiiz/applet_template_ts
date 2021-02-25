Component({
    properties: {
        type: {
            type: String,
            value: "all"
        },
        homepage: {
            type: String,
            value: "/pages/index/index/index"
        },
        color: {
            type: String,
            value: "#333"
        },
        showLeft: {
            type: Boolean,
            value: true
        },
        showRight: {
            type: Boolean,
            value: true
        }
    },
    data: {
        pageLength: 0
    },
    methods: {},
    lifetimes: {
        attached: function () { },
        ready: function () {
            this.setData({
                pageLength: getCurrentPages().length
            });
        },
        moved: function () { },
        detached: function () { },
    },
});
export {};
