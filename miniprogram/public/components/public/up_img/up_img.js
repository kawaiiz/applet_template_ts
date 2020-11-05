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
import { gotoLogin, toast, isHaveBASEURL } from '../../../utils/util';
Component({
    behaviors: [computedBehavior],
    options: {
        addGlobalClass: true,
    },
    properties: {
        BASEURL: {
            type: String,
            value: ''
        },
        upFileUrl: {
            type: String,
            value: ''
        },
        imageList: {
            type: Array,
            value: []
        },
        maxLength: {
            type: Number,
            value: 1000000
        },
        token: {
            type: String,
            value: ''
        },
        onlyShow: {
            type: Boolean,
            value: false
        }
    },
    watch: {
        imageList(imageList) {
            const { BASEURL } = this.data;
            const newShowList = [];
            const newValueList = [];
            imageList.forEach(item => {
                if (typeof item === 'object') {
                    newShowList.push(Object.assign(Object.assign({}, item), { path: isHaveBASEURL(item.path, BASEURL) ? item.path : `${BASEURL}${item.path}`, error: false }));
                    newValueList.push(item);
                }
                else if (typeof item === 'string') {
                    newShowList.push({
                        path: item.indexOf(BASEURL) !== -1 ? item : `${BASEURL}${item}`,
                        error: false
                    });
                    newValueList.push({
                        path: item
                    });
                }
            });
            this.setData({
                showList: newShowList,
                valueList: newValueList
            });
        },
        valueList(_valueList) {
            this.handleChangeValueList();
        },
        disabled(_disabled) {
            this.handleChangeDisabled();
        },
    },
    data: {
        showList: [],
        valueList: [],
        disabled: false,
    },
    methods: {
        handleClickSeeImage(e) {
            const { showList } = this.data;
            const { index } = e.currentTarget.dataset;
            const arr = showList.map(item => item.path);
            wx.previewImage({
                current: arr[index],
                urls: arr
            });
        },
        handleClickDel(e) {
            const { index } = e.currentTarget.dataset;
            const { showList, valueList } = this.data;
            const newShowList = [...showList];
            const newValueList = [...valueList];
            newShowList.splice(index, 1);
            newValueList.splice(index, 1);
            this.setData({
                showList: newShowList,
                valueList: newValueList
            });
        },
        handleClickAdd() {
            const { maxLength, showList } = this.data;
            const surplusNum = maxLength - showList.length;
            wx.chooseImage({
                count: surplusNum > 9 ? 9 : surplusNum,
                sourceType: ['camera', "album"],
                success: (res) => {
                    this.upImageAll(res.tempFilePaths);
                },
                fail: function (err) {
                    console.log(err);
                }
            });
        },
        upImageAll(tempFilePaths) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    wx.showLoading({
                        title: '请等待',
                    });
                    this.setData({
                        disabled: true
                    });
                    const requestList = [];
                    tempFilePaths.forEach((item) => {
                        requestList.push(this.upImage(item));
                    });
                    const res = yield Promise.all(requestList);
                    this.handleDownloadData(res);
                    this.setData({
                        disabled: false
                    });
                    wx.hideLoading();
                }
                catch (e) {
                    console.log(e);
                }
            });
        },
        upImage(tempFilePath) {
            const { token, upFileUrl, BASEURL } = this.data;
            return new Promise((resolve) => {
                wx.uploadFile({
                    url: upFileUrl,
                    filePath: tempFilePath,
                    name: 'file',
                    header: {
                        Authorization: token,
                    },
                    formData: {
                        token
                    },
                    success: (res) => {
                        let data = JSON.parse(res.data);
                        if (res.statusCode === 401) {
                            toast({
                                title: data.errorMsg || '登录失效，请重新登录',
                                cb: gotoLogin
                            });
                            return;
                        }
                        if (data.status === 200) {
                            resolve({
                                showListItem: {
                                    error: false,
                                    path: isHaveBASEURL(data.data.path, BASEURL) ? data.data.path : `${BASEURL}${data.data.path}`,
                                },
                                valueListItem: Object.assign(Object.assign({}, data.data), { path: isHaveBASEURL(data.data.path, BASEURL) ? data.data.path : `${BASEURL}${data.data.path}` })
                            });
                        }
                        else {
                            resolve({
                                showListItem: {
                                    error: true,
                                    path: data.data.path
                                }
                            });
                        }
                    },
                    fail: (err) => {
                        console.log(err);
                        resolve({
                            showListItem: {
                                error: true,
                                path: tempFilePath
                            }
                        });
                    }
                });
            });
        },
        handleDownloadData(data) {
            const { showList, valueList } = this.data;
            const newShowList = [...showList];
            const newValueList = [...valueList];
            data.forEach((item, index) => {
                const successIndex = index + valueList.length;
                if (item.showListItem.error) {
                    newShowList[successIndex] = item.showListItem;
                    newValueList[successIndex] = null;
                }
                else {
                    newShowList[successIndex] = item.showListItem;
                    newValueList[successIndex] = item.valueListItem;
                }
            });
            this.setData({
                showList: newShowList,
                valueList: newValueList
            });
        },
        handleChangeValueList() {
            this.triggerEvent('changevaluelist', {
                valueList: this.data.valueList.filter(item => !!item)
            });
        },
        handleChangeDisabled() {
            this.triggerEvent('changedisabled', {
                disabled: this.data.disabled
            });
        },
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
            const { BASEURL, token, upFileUrl } = this.data;
            if (!BASEURL)
                console.error('props中缺少BASEURL！');
            if (!token)
                console.error('props中缺少token！');
            if (!upFileUrl)
                console.error('props中缺少upFileUrl！');
        },
        moved: function () { },
        detached: function () { },
    },
});
