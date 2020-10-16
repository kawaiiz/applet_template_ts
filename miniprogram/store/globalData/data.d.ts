export interface UserInfo {
  id: number,
  mobile: string, // 手机号
  isAuth: boolean // 是否认证
}

export interface GlobalDataStore {
  loginFlag?: number,
  token?: string,
  pageConfig?: GlobalData.PageConfig,
  userInfo?: UserInfo,
}

// action动作
export type GlobalDataAction = {
  getUserInfo(): void,
  initGlobalData(): void,
  setToken(token: string): Promise<undefined>
}