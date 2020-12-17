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
import { mockData } from '../../public/utils/util';
const data = {
    loginFlag: 0,
    token: "",
    userInfo: {},
    pageConfig: setNavStyle(),
};
export const globalAction = {
    getUserInfo: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield mockData('data', {
                    id: 1,
                    nickname: '测试mock',
                    mobile: '',
                    avatar: '',
                });
                this.userInfo = res.data;
            }
            catch (e) {
                console.log(e);
            }
        });
    }),
    initGlobalData() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    },
    setToken: action(function (token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.token = token;
                wx.setStorageSync('token', token || '');
                if (token) {
                    yield this.getUserInfo();
                    this.loginFlag = 1;
                    yield this.initGlobalData();
                }
                else {
                    this.login();
                    this.loginFlag = 2;
                }
            }
            catch (e) {
                console.log(e);
                this.loginFlag = 2;
            }
        });
    }),
    login: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    wx.login({
                        success: (res) => __awaiter(this, void 0, void 0, function* () {
                            yield this.setToken('this is token');
                            resolve(undefined);
                        })
                    });
                }
                catch (e) {
                    reject(undefined);
                }
            });
        });
    }),
};
export default Object.assign(Object.assign({}, data), globalAction);
