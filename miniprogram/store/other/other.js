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
import { delay, mockData } from '../../public/utils/util';
const data = {
    captchaDisable: false,
    captchaTime: 60,
    defaultCaptchaTime: 60,
};
export const otherAction = {
    getCaptcha: action(function (data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mockData('data', null);
                this.captchaDisable = true;
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
                    const { captchaTime, captchaDisable } = this;
                    yield delay(1000);
                    if (captchaTime > 0 && captchaDisable) {
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
    }),
    initCaptcha: action(function () {
        this.captchaTime = this.defaultCaptchaTime;
        this.captchaDisable = false;
    })
};
export default Object.assign(Object.assign({}, data), otherAction);
