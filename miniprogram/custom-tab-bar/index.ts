import { getNowPage } from '../public/utils/util'
const app = getApp<IAppOption>()

interface Tab {
  route: string, // 路由 
  text: string, // 文字
  icon: string, // 非活跃图标
  icon_active: string, // 活跃图标
  color: string, // 非活跃颜色
  color_active: string // 活跃颜色
}

type InitData = {
  IMAGEURL: string,
  tabsList: Tab[],
  activeNum: number
}

type InitProperty = {}

type InitMethod = {
  setActiveTab(): void
} 

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    IMAGEURL: app.globalData.IMAGEURL,
    tabsList: [
      {
        route: "/pages/index/index/index",
        text: "首页",
        icon: "home.png", // 非活跃图标
        icon_active: "home_active.png", // 活跃图标
        color: "#D0D0D0", // 非活跃颜色
        color_active: "#677BEE" // 活跃颜色
      },
      {
        route: "/pages/terminal/terminal/terminal",
        text: "终端",
        icon: "terminal.png", // 非活跃图标
        icon_active: "terminal_active.png", // 活跃图标
        color: "#D0D0D0", // 非活跃颜色
        color_active: "#677BEE" // 活跃颜色
      },
      {
        route: "/pages/user/user/user",
        text: "我的",
        icon: "user.png", // 非活跃图标
        icon_active: "user_active.png", // 活跃图标
        color: "#D0D0D0", // 非活跃颜色
        color_active: "#677BEE" // 活跃颜色
      }
    ],
    activeNum: NaN,// 当前活跃项
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 设置活跃的tab
    setActiveTab() {
      try {
        const page = getNowPage()
        const { tabsList } = this.data
        this.setData({
          activeNum: tabsList.findIndex(item => item.route.indexOf(page.route) !== -1)
        })
      } catch (e) {
        console.log(e)
      }
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log(11)
      this.setActiveTab()
    },
    hide: function () { },
    resize: function () { },
  },

})

export { }