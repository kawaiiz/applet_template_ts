var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import http from '../../public/utils/api.request';
import { REFRESH_TOKEN } from '../../public/utils/config';
export function getUserInfo() {
    return http.request({
        url: '/market/v1/getUserCenterInfo',
        method: 'GET',
        data: {},
        contentType: "application/x-www-form-urlencoded",
        requestLoading: true,
        isLogin: true
    });
}
export function loginWorkNumber(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield http.request({
            url: '/market/v1/marketNumLogin',
            method: 'POST',
            data,
            isLogin: true
        });
    });
}
export function loginMobile(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield http.request({
            url: '/market/v1/msgCodeLogin',
            method: 'POST',
            data,
            isLogin: true
        });
    });
}
export function resetToken() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield http.request({
            url: '/market/v1/refreshToken',
            method: 'POST',
            data: {},
            isLogin: true,
            header: {
                refresh_token: wx.getStorageSync(REFRESH_TOKEN)
            }
        });
    });
}
export function upFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield http.upFile({
            url: '/market/v1/upload',
            filePath: url,
            requestType: 'file'
        });
    });
}
