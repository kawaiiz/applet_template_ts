var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const computedBehavior = require('miniprogram-computed');
const { storeBindingsBehavior } = require('mobx-miniprogram-bindings');
import store from '../../store/index/index';
import { otherAction } from '../../store/other/other';
import { toast } from '../../public/utils/util';
import { dataCheck, dataCheckItem } from '../../public/components/public/form/ts/form_verification';
import { debounce } from 'lodash';
const app = getApp();
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
        BASEURL: app.globalData.BASEURL,
        IMAGEURL: app.globalData.IMAGEURL,
        requestData: {},
        type: false,
        typeText: '',
        rangeList: [{
                id: 1, name: '类型一'
            }, {
                id: 2, name: '类型二'
            }, {
                id: 3, name: '类型三'
            }],
        rules: {
            name: {
                required: true,
                type: 'string',
                message: '请输入活动名称~'
            },
            typeId: {
                required: true,
                message: '请选择支出类型~'
            },
            date: {
                required: true,
                message: '请选择支出日期~'
            },
            money: {
                required: true,
                type: 'number',
                message: '请输入实际支出数额~'
            }
        },
        error: {},
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
    methods: Object.assign(Object.assign({}, otherAction), { handleChangeInput: debounce(function (e) {
            const { rules } = this.data;
            const { key } = e.currentTarget.dataset;
            const { value } = e.detail;
            this.setData({
                [`requestData.${key}`]: value,
                [`error.${key}`]: dataCheckItem(rules[key], value, key)
            });
        }, 200, {
            leading: false,
            trailing: true
        }), handleChangePicker(e) {
            console.log(e);
            const { rules } = this.data;
            const { key } = e.currentTarget.dataset;
            const { value } = e.detail;
            let newValue = null;
            const setData = {};
            if (key === 'typeId') {
                const { rangeList } = this.data;
                newValue = rangeList && rangeList[value].id;
            }
            else if (key === 'date') {
                newValue = value;
            }
            setData[`requestData.${key}`] = newValue;
            setData[`error.${key}`] = dataCheckItem(rules[key], newValue, key);
            this.setData(setData);
        }, handleChangeImages(e) {
            this.setData({
                'requestData.images': e.detail.value,
            });
        },
        handleChangeUpdataLoading(e) {
            this.setData({
                upDataLoading: e.detail.value
            });
        },
        handleChangeType() {
            const { type } = this.data;
            this.setData({
                type: !type
            });
        }, handleClickCaptcha() {
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
                    toast(e.errMsg || '短信发送失败，请稍后重试！');
                }
            });
        }, handleSubmit: debounce(function () {
            try {
                const { requestData, rules } = this.data;
                const check = dataCheck(rules, requestData);
                console.log(check);
                if (check.errorArr.length > 0) {
                    this.setData({
                        error: check.errorObj
                    });
                }
            }
            catch (e) {
            }
        }, 200, {
            leading: false,
            trailing: true
        }), onLoad(options) {
            console.log(options);
        }, onShow() {
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
