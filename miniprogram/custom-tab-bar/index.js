const { storeBindingsBehavior } = require('mobx-miniprogram-bindings');
import { globalDataStore, } from '../store/globalData/globalData';
import { getNowPage } from '../public/utils/util';
const app = getApp();
Component({
    behaviors: [storeBindingsBehavior],
    options: {
        addGlobalClass: true,
    },
    properties: {},
    data: {
        IMAGEURL: app.globalData.IMAGEURL,
        tabsList: [
            {
                route: "/pages/index/index/index",
                text: "首页",
                icon: "tab_index.png",
                icon_active: "tab_index_active.png",
                color: "#D0D0D0",
                color_active: "#629BFF"
            },
            {
                route: "/pages/map/index/index",
                text: "找车位",
                icon: "tab_map.png",
                icon_active: "tab_map_active.png",
                color: "#D0D0D0",
                color_active: "#629BFF"
            },
            {
                route: "/pages/user/index/index",
                text: "我的",
                icon: "tab_user.png",
                icon_active: "tab_user_active.png",
                color: "#D0D0D0",
                color_active: "#629BFF"
            }
        ],
        activeNum: NaN,
    },
    storeBindings: {
        store: globalDataStore,
        fields: {
            pageConfig: (store) => store.pageConfig
        }
    },
    methods: {
        setActiveTab() {
            try {
                console.log(this.data.pageConfig);
                console.log(this.data);
                const page = getNowPage();
                const { tabsList } = this.data;
                this.setData({
                    activeNum: tabsList.findIndex(item => item.route.indexOf(page.route) !== -1)
                });
            }
            catch (e) {
                console.log(e);
            }
        }
    },
    lifetimes: {
        attached: function () { },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () {
            console.log(11);
            this.setActiveTab();
        },
        hide: function () { },
        resize: function () { },
    },
});
