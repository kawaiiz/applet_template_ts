import http from '../public/utils/api.request';

export interface GetCaptchaData { mobile: string, type?: string }

// 获取短信
export async function getCaptcha(data: GetCaptchaData) {
  return await http.request({
    url: '/mini/news/getlist',
    method: 'GET',
    data,
  })
} 