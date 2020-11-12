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
        },
        backgroundColor: {
            type: String,
            value: '#fff'
        },
        color: {
            type: String,
            value: '#aaa'
        },
        activeColor: {
            type: String,
            value: '#333'
        },
        borderRadius: {
            type: Boolean,
            value: true
        },
        boxShadow: {
            type: Boolean,
            value: true
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
