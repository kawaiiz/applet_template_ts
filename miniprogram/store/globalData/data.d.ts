export interface UserInfo {
  id: number,
  nickname: string,
  avatar: string,
  mobile: string, // 手机号
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
  setToken(token: string): Promise<undefined>,
  login(): Promise<undefined>,
}