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
import { upFile } from '../../../../store/globalData/service';
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
        imageList: {
            type: Array,
            value: []
        },
        maxLength: {
            type: Number,
            value: 1000000
        },
        onlyShow: {
            type: Boolean,
            value: false
        }
    },
    data: {
        showList: [],
        valueList: [],
        disabled: false,
        downloadImageMap: {}
    },
    watch: {
        imageList(imageList) {
            const { BASEURL } = this.data;
            const newShowList = [];
            const newValueList = [];
            imageList.forEach(item => {
                if (typeof item === 'object') {
                    newShowList.push({
                        path: item.url,
                        error: false
                    });
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
    methods: {
        downloadFile(url, index) {
            const { downloadImageMap } = this.data;
            if (downloadImageMap[index]) {
                return Promise.resolve(downloadImageMap[index]);
            }
            return new Promise((resolve) => {
                wx.downloadFile({
                    url: url,
                    success: (res) => {
                        this.setData({
                            [`downloadImageMap[${index}]`]: res.tempFilePath
                        });
                        resolve(res.tempFilePath);
                    },
                    fail: () => {
                        this.setData({
                            [`downloadImageMap[${index}]`]: url
                        });
                        resolve(url);
                    }
                });
            });
        },
        handleClickSeeImage(e) {
            return __awaiter(this, void 0, void 0, function* () {
                const { showList } = this.data;
                const { index } = e.currentTarget.dataset;
                const urlArr = showList.map(item => typeof item.path === 'string' ? item.path : item.path.url);
                const systemInfo = wx.getSystemInfoSync();
                wx.showLoading({
                    title: '请等待'
                });
                const arr = systemInfo.platform === 'android' ? yield Promise.all(urlArr.map((item, index) => this.downloadFile(item, index))) : urlArr;
                wx.hideLoading();
                wx.previewImage({
                    current: arr[index],
                    urls: arr
                });
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
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const res = yield upFile(tempFilePath);
                    console.log(res);
                    return Promise.resolve({
                        showListItem: {
                            error: false,
                            path: res.data.url,
                        },
                        valueListItem: Object.assign(Object.assign({}, res.data), { path: res.data.url })
                    });
                }
                catch (e) {
                    return Promise.resolve({
                        showListItem: {
                            error: true,
                            path: tempFilePath
                        }
                    });
                }
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
                value: this.data.valueList.filter(item => !!item)
            });
        },
        handleChangeDisabled() {
            this.triggerEvent('changedisabled', {
                value: this.data.disabled
            });
        },
        tipFc() {
            const { BASEURL, onlyShow } = this.data;
            if (!BASEURL)
                console.error('props中缺少BASEURL！');
            if (!onlyShow) {
            }
        }
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
            this.tipFc();
        },
        moved: function () { },
        detached: function () { },
    },
});
