import http from '../../public/utils/api.request';


// 获取用户信息 校验token是否失效
export function getUserInfo() {
  return http.request<Store.UserInfo>({
    url: '/api/member/info',
    method: 'GET',
    data: {},
    requestLoading: true
  })
}