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