const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        dataList: {
            type: Array,
            value: []
        },
        tabTextKey: {
            type: String,
            value: ''
        },
        initTabCurrent: {
            type: Number,
            value: undefined
        }
    },
    data: {
        IMAGEURL: app.globalData.IMAGEURL,
        tabCurrent: 0,
    },
    methods: {
        handleClickTab(e) {
            const { tabCurrent } = this.data;
            const { index } = e.currentTarget.dataset;
            if (tabCurrent === index)
                return;
            this.setData({
                tabCurrent: index
            }, () => {
                this.triggerEvent('changetabcurrent', {
                    value: index
                });
            });
        },
        initComponent() {
            const { initTabCurrent } = this.data;
            this.setData({
                tabCurrent: typeof initTabCurrent === 'number' ? initTabCurrent : 0
            });
        }
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
            this.initComponent();
        },
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
