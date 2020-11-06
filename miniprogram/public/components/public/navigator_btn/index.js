Component({
    properties: {
        type: {
            type: String,
            value: "all"
        },
        homepage: {
            type: String,
            value: ""
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
    data: {},
    methods: {
        tipFc() {
            const { type, homepage } = this.data;
            if (type === 'all' && !homepage) {
                console.error('homepage:按钮全部出现下，homepage字段必填。');
            }
        }
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
            this.tipFc();
        },
        moved: function () { },
        detached: function () { },
    },
});
export {};
