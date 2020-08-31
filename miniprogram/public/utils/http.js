var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { gotoLogin, gotoError } from './util';
import { BASEURL } from "./config";
import http from './api.request';
import { globalDataStore } from '../../store/globalData/globalData';
let isRefreshing = false;
let requests = [];
let responents = [];
let requestList = [];
const createFormData = (obj = {}) => {
    let result = '';
    for (let name of Object.keys(obj)) {
        let value = obj[name];
        result +=
            '\r\n--XXX' +
                '\r\nContent-Disposition: form-data; name=\"' + name + '\"' +
                '\r\n' +
                '\r\n' + value;
    }
    return result + '\r\n--XXX--';
};
const getToken = () => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        console.log('获取token');
        wx.login({
            success(res) {
                const { code } = res;
                const requestData = { code, pid: 0, isTwo: 0, isPublic: 0 };
                wx.request({
                    url: `${BASEURL}/mini/login/login`,
                    method: "POST",
                    data: createFormData(requestData),
                    header: {
                        'content-type': 'multipart/form-data; boundary=XXX'
                    },
                    success(res) {
                        if (res.statusCode === 200 && res.data.code === 1) {
                            globalDataStore.setToken(res.data.data);
                            isRefreshing = false;
                            resolve();
                        }
                        else {
                            reject();
                        }
                    },
                    fail(e) {
                        reject(e);
                    }
                });
            },
            fail(e) {
                reject(e);
            }
        });
    });
});
class HttpRequest {
    constructor() {
        this.requestTask = null;
        this.BASEURL = BASEURL;
        this.queue = {};
    }
    requestSuccess(res, option) {
        for (let i = 0; i < requestList.length; i++) {
            if (requestList[i] === this.requestTask) {
                requestList.splice(i, 1);
            }
        }
        if (res && (res.statusCode == 200)) {
            let data = res.data;
            if (typeof data === 'string') {
                data = JSON.parse(data);
            }
            if (data.code === 1) {
                return Promise.resolve(data);
            }
            else if (data.code == 2) {
                globalDataStore.setToken("");
                gotoLogin();
                return Promise.reject(data);
            }
            else if (data.code == 0) {
                return Promise.reject(data);
            }
            else {
                console.log(data, option);
                gotoError();
                return Promise.reject(data);
            }
        }
        else {
            console.log(res, option);
            gotoError();
            return Promise.reject(res.data);
        }
    }
    requestFail(err, option) {
        console.log(err);
        for (let i = requestList.length - 1; i >= 0; i--) {
            if (requestList[i].abort) {
                requestList[i].abort();
            }
            requestList.pop();
        }
        console.log(err, option);
        gotoError();
    }
    createOptions(option, resolve, reject) {
        let token = '';
        try {
            token = wx.getStorageSync('token');
        }
        catch (e) {
            console.log(e);
        }
        if (option.contentType === 'multipart/form-data; boundary=XXX' && option.method === 'POST') {
            option.data = createFormData(option.data);
        }
        return {
            url: option.allUrl ? option.allUrl : this.BASEURL + option.url,
            data: option.data,
            header: {
                'Content-Type': option.contentType ? option.contentType : 'text/plain;charset=UTF-8',
                'Authorization': token
            },
            method: option.method ? option.method : 'POST',
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                this.requestFail(err, option);
                reject();
            },
            complete: () => {
                if (option.requestLoading) {
                    wx.hideLoading();
                }
            }
        };
    }
    interceptorsRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isRefreshing) {
                return Promise.resolve();
            }
            else {
                return new Promise(resolve => {
                    requests.push(() => __awaiter(this, void 0, void 0, function* () {
                        resolve();
                    }));
                });
            }
        });
    }
    interceptorsResponent(option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!isRefreshing) {
                    isRefreshing = true;
                    yield getToken();
                    requests.forEach(cb => cb());
                    responents.forEach(cb => cb());
                    requests = [];
                    responents = [];
                    return http.request(option);
                }
                else {
                    return new Promise(resolve => {
                        console.log(option);
                        responents.push(() => __awaiter(this, void 0, void 0, function* () {
                            try {
                                console.log(option);
                                const res = yield http.request(option);
                                resolve(res);
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }));
                    });
                }
            }
            catch (e) {
                return Promise.reject();
            }
        });
    }
    request(option = {
        data: {},
        url: ''
    }) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (option.requestLoading) {
                wx.showLoading({
                    title: '请稍等',
                });
            }
            yield this.interceptorsRequest();
            let options = this.createOptions(option, resolve, reject);
            const requestTask = wx.request(options);
            requestList.push(requestTask);
        })).then((res) => {
            return this.requestSuccess(res, option);
        });
    }
}
export default HttpRequest;
