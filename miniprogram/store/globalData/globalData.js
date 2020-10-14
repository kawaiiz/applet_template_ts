var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { action } = require('mobx-miniprogram');
import { setNavStyle, } from '../../public/utils/util';
import { getUserInfo } from './service';
const data = {
    login: 0,
    token: "",
    userInfo: {
        id: NaN,
        mobile: '',
        isAuth: false
    },
    pageConfig: setNavStyle(),
};
export const dataAction = {
    getUserInfo: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield getUserInfo();
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
                    this.login = 1;
                    yield this.initGlobalData();
                }
                else {
                    this.login = 2;
                }
            }
            catch (e) {
                console.log(e);
                this.login = 2;
            }
        });
    })
};
export default Object.assign({}, data, dataAction);
