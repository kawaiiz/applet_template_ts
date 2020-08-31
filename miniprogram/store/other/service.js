import http from '../../public/utils/api.request';
export function getCaptcha(data) {
    return http.request({
        url: '/mini/news/getlist',
        method: 'GET',
        data,
    });
}
