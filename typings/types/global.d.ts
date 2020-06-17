declare namespace GlobalData {

  // 用户信息
  interface UserInfo {
    id: number,
    nickName: string,// 姓名
    avatarUrl: string,// 头像
    mobile: string,// 手机号
    times: number,// 获取次数
  }

  // 全局屏幕
  interface PageConfig {
    pixelRate: number,//px与rpx换算关系
    platform: string,//操作平台 用于适配胶囊高度
    capsuleHeight: number,//胶囊高度
    statusBarHeight: number,//手机顶部状态栏高度
    titleHeight: number,//整个导航头高度
    systemHeight: number,//手机屏幕高度
    isAllScreen: boolean,//是否是全面屏手机
    isHighHead: boolean,//是否是刘海屏手机
  }


  // 转发
  interface Transmit {
    // title: string,
    // path: string,
    imageUrl: string,
    success: (res: any) => void,
    fail: (res: any) => void,
  }

  // 全局的globalData参数设置
  interface GlobalData {
    IMAGEURL: string, // 图片前缀
    BASEURL: string, // 请求域名
    pageConfig: PageConfig,// 屏幕参数
    watchUserInfoFn: any[],// 监听个人信息的函数列表
    watchStoreFn: any[],// 监听store的函数列表
    userInfo: UserInfo | {},// 个人信息
    token: string, //token
    store: Store.Store,// 公共数据
    transmit: Transmit,
    [key: string]: any
  }
}
