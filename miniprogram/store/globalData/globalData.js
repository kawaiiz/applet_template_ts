var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { action } = require('mobx-miniprogram');
import { setNavStyle, } from '../../public/utils/util';
import { loginMobile, loginWorkNumber, resetToken, } from './service';
import { mockData, gotoLogin } from '../../public/utils/util';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../public/utils/config';
const data = {
    cMain: "#687CEE",
    loginFlag: 0,
    token: "",
    userInfo: {},
    pageConfig: setNavStyle(),
};
export const globalAction = {
    getGlobalData: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Promise.all([]);
            }
            catch (e) {
                console.log(e);
            }
        });
    }),
    initGlobalData: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([this.getGlobalData()]);
        });
    }),
    getUserInfo: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield mockData('data', {});
                this.userInfo = res.data;
            }
            catch (e) {
                console.log(e);
            }
        });
    }),
    setToken: action(function (token, refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.token = token;
            wx.setStorageSync(ACCESS_TOKEN, token);
            if (refresh_token || refresh_token === '') {
                wx.setStorageSync(REFRESH_TOKEN, refresh_token);
            }
        });
    }),
    initApp: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.token) {
                    yield this.getUserInfo();
                    this.loginFlag = 1;
                    this.initGlobalData();
                }
                else {
                    this.loginFlag = 2;
                }
            }
            catch (e) {
                console.log(e);
                this.loginFlag = 2;
                return Promise.reject(e);
            }
        });
    }),
    login: action(function (requestData, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = null;
                if (type === 'mobile') {
                    res = yield loginMobile(requestData);
                }
                else if (type === 'workNumber') {
                    res = yield loginWorkNumber(requestData);
                }
                console.log(res);
                this.setToken(res.data.access_token, res.data.refresh_token);
                yield this.initApp();
                return res;
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }),
    logout: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.setToken('', '');
                yield this.initApp();
                this.userInfo = {};
                gotoLogin();
            }
            catch (e) {
                console.log(e);
            }
        });
    }),
    resetToken: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield resetToken();
                this.setToken(res.data.access_token, res.data.refresh_token);
            }
            catch (e) {
                console.log(e);
                yield this.setToken('', '');
                this.initApp();
                return Promise.reject(e);
            }
        });
    })
};
export default Object.assign(Object.assign({}, data), globalAction);
