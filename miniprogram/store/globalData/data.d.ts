export interface UserInfo {

}


export interface GlobalDataStore {
  cMain?: string,// 主题色
  loginFlag?: number,
  token?: string,
  pageConfig?: GlobalData.PageConfig,
  userInfo?: UserInfo,
}

// action动作
export type GlobalDataAction = {
  getGlobalData(): void,
  getUserInfo(): void,
  initGlobalData(): void,
  initApp(): void,
  setToken(token: string, refresh_token?: string): Promise<undefined>,
  login(requestData: any): void,
  logout(): void
  resetToken(): Promise<string>
}


// 账号登录字段
export interface LoginWorkNumberData {
  workNumber: string,
  password: string,
  [key: string]: any
}

// 手机号登录字段
export interface LoginMobileData {
  mobile: string,
  captcha: string,
  [key: string]: any
}


export interface LoginResponse {
  access_token: string
  refresh_token: string
  userAccountId: number
  userType: number
}

// 上传文件的返回信息
export interface UpFileResponse {
  bucketName: string
  encryptKey: string | null
  objectName: string
  originalFilename: string
  rename: string
  url: string
}