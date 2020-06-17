import http from '../../../public/utils/api.request';
import { News } from './data'

// 获取新闻
export async function getNewsList() {
  return await http.request<News[]>({
    url: '/mini/news/getlist',
    method: 'GET',
    data: {},
  })
} 