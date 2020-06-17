import http from './public/utils/api.request';

// 获取用户信息
export async function getUserInfo() {
  return await http.request<GlobalData.UserInfo>({
    url: '/mini/member/info',
    method: 'GET',
    data: {},
    requestLoading: true
  })
}