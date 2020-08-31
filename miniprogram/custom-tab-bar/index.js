import { getNowPage } from '../public/utils/util';
const app = getApp();
Component({
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
                icon: "home.png",
                icon_active: "home_active.png",
                color: "#D0D0D0",
                color_active: "#677BEE"
            },
            {
                route: "/pages/terminal/terminal/terminal",
                text: "终端",
                icon: "terminal.png",
                icon_active: "terminal_active.png",
                color: "#D0D0D0",
                color_active: "#677BEE"
            },
            {
                route: "/pages/user/user/user",
                text: "我的",
                icon: "user.png",
                icon_active: "user_active.png",
                color: "#D0D0D0",
                color_active: "#677BEE"
            }
        ],
        activeNum: NaN,
    },
    methods: {
        setActiveTab() {
            try {
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
