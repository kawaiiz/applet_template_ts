var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const computedBehavior = require('miniprogram-computed');
const { storeBindingsBehavior } = require('mobx-miniprogram-bindings');
import store from '../../store/index/index';
import { dataAction } from '../../store/other/other';
import { toast } from '../../public/utils/util';
Component({
    behaviors: [computedBehavior, storeBindingsBehavior],
    options: {
        addGlobalClass: true,
    },
    properties: {},
    storeBindings: {
        store,
        fields: {
            captchaDisable: () => store.captchaDisable,
            captchaTime: () => store.captchaTime,
        },
        actions: ["getCaptcha", "setCaptchaTime"]
    },
    data: {
        type: false,
        typeText: ''
    },
    computed: {
        typeText(data) {
            if (data.type) {
                return "type:true";
            }
            else {
                return "type:false";
            }
        },
    },
    watch: {
        'type': function (_type) {
            console.log(_type);
        }
    },
    methods: Object.assign({}, dataAction, { handleChangeType() {
            const { type } = this.data;
            this.setData({
                type: !type
            });
        },
        handleClickCaptcha() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { captchaDisable } = this.data;
                    console.log(captchaDisable);
                    if (captchaDisable)
                        return;
                    const { mobile } = { mobile: '18888888888' };
                    yield this.getCaptcha({ mobile });
                    this.setCaptchaTime();
                }
                catch (e) {
                    console.log(e);
                    toast(e.errMsg || '短信发送失败，请稍后重试！');
                }
            });
        },
        onLoad(options) {
            console.log(options);
        },
        onShow() {
            console.log('onShow');
        },
        onReady() {
            console.log('onReady');
        } }),
    lifetimes: {
        attached: function () { },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
