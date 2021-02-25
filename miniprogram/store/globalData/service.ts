import http from '../../public/utils/api.request';
import { UserInfo, LoginWorkNumberData, LoginMobileData, LoginResponse, UpFileResponse, } from './data'
import { REFRESH_TOKEN } from '../../public/utils/config'

// 获取用户信息 校验token是否失效
export function getUserInfo() {
  return http.request<UserInfo>({
    url: '/market/v1/getUserCenterInfo',
    method: 'GET',
    data: {},
    contentType: "application/x-www-form-urlencoded",
    requestLoading: true,
    isLogin: true
  })
}

// 工号登录
export async function loginWorkNumber(data: LoginWorkNumberData) {
  return await http.request<LoginResponse>({
    url: '/market/v1/marketNumLogin',
    method: 'POST',
    data,
    isLogin: true
  })
}

// 手机号登录
export async function loginMobile(data: LoginMobileData) {
  return await http.request<LoginResponse>({
    url: '/market/v1/msgCodeLogin',
    method: 'POST',
    data,
    isLogin: true
  })
}

// 更新token
export async function resetToken() {
  return await http.request<LoginResponse>({
    url: '/market/v1/refreshToken',
    method: 'POST',
    data: {},
    isLogin: true,
    header: {
      refresh_token: wx.getStorageSync(REFRESH_TOKEN)
    }
  })
}

//上传文件
export async function upFile(url: string) {
  return await http.upFile<UpFileResponse>({
    url: '/market/v1/upload',
    filePath: url,
    requestType: 'file'
  })
}