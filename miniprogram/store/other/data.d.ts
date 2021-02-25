
// store数据 加问号  可以与页面内的initData做合集 使用
export interface OtherStore {
  captchaDisable?: boolean,
  captchaTime?: number,
  defaultCaptchaTime?: number
}

// action动作
export type OtherAction = {
  getCaptcha(data: GetCaptchaData): void,
  setCaptchaTime(): void
  initCaptcha(): void
}

export interface GetCaptchaData {
  mobile: string,
  type?: string
}