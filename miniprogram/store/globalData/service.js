import http from '../../public/utils/api.request';
export function getUserInfo() {
    return http.request({
        url: '/api/member/info',
        method: 'GET',
        data: {},
        requestLoading: true
    });
}
