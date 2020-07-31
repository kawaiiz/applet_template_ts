var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { observable, action } = require('mobx-miniprogram');
import { setNavStyle, delay } from '../public/utils/util';
const data = {
    pageConfig: setNavStyle(),
    captchaDisable: false,
    captchaTime: 60,
    defaultCaptchaTime: 60,
};
export const dataAction = {
    getCaptcha: action(function (_data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.captchaDisable = true;
                return Promise.resolve();
            }
            catch (e) {
                console.log(e);
                this.captchaDisable = false;
                return Promise.reject(e);
            }
        });
    }),
    setCaptchaTime: action(function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                while (true) {
                    console.log(this);
                    const { captchaTime } = this;
                    yield delay(1000);
                    if (captchaTime > 0) {
                        this.captchaTime -= 1;
                    }
                    else {
                        this.captchaTime = this.defaultCaptchaTime;
                        this.captchaDisable = false;
                        return;
                    }
                }
            }
            catch (e) {
                console.log(e);
                return Promise.reject(e);
            }
        });
    })
};
export const store = observable(Object.assign({}, data, dataAction));
