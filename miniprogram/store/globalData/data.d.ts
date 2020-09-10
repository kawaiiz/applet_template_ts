export interface UserInfo {

}

export interface GlobalDataStore {
  login?: number,
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