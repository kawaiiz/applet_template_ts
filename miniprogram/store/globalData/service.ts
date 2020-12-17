import http from '../../public/utils/api.request';
import { UserInfo } from './data'

// 获取用户信息 校验token是否失效
export function getUserInfo() {
  return http.request<UserInfo>({
    url: '/api/member/info',
    method: 'GET',
    data: {},
    requestLoading: true
  })
}



// 登录
export async function login(data: { code: string }) {
  return await http.request<string>({
    url: '',
    method: 'POST',
    data,
  })
}