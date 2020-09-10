import http from '../../public/utils/api.request';
import { GetCaptchaData } from './data'

// 获取短信
export function getCaptcha(data: GetCaptchaData) {
  return http.request({
    url: '/mini/news/getlist',
    method: 'GET',
    data,
  })
} 