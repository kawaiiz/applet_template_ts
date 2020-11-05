var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getNowPage = () => {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
};
export function autoUpdate() {
    if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate((res) => {
            if (res.hasUpdate) {
                updateManager.onUpdateReady(() => {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: (res) => {
                            if (res.confirm) {
                                updateManager.applyUpdate();
                            }
                            else if (res.cancel) {
                                wx.showModal({
                                    title: '温馨提示~',
                                    content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                                    success: function (res) {
                                        if (res.confirm) {
                                            updateManager.applyUpdate();
                                        }
                                        else if (res.cancel) {
                                            autoUpdate();
                                        }
                                    }
                                });
                            }
                        }
                    });
                });
                updateManager.onUpdateFailed(() => {
                    wx.showModal({
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线~，请您删除当前小程序，重新搜索打开~',
                    });
                });
            }
        });
    }
    else {
        wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        });
    }
}
export const toast = (option) => {
    let title, cb, duration;
    if (typeof option === 'string') {
        title = option;
        cb = undefined;
        duration = null;
    }
    else {
        title = option.title;
        cb = option.cb;
        duration = option.duration;
    }
    const time = duration || 1500;
    wx.showToast({
        title: title,
        icon: 'none',
        duration: time,
        complete: function () {
            setTimeout(() => {
                return typeof (cb) === 'function' && cb();
            }, time);
        }
    });
};
export const setNavStyle = () => {
    const config = {
        pixelRate: 0.5,
        platform: 'ios',
        capsuleHeight: 44,
        statusBarHeight: 20,
        titleHeight: 136,
        systemHeight: 0,
        isAllScreen: false,
        isHighHead: false,
        phoneSystem: undefined
    };
    let res = wx.getSystemInfoSync();
    console.log(res);
    config.phoneSystem = res.platform.toLowerCase();
    config.pixelRate = res.windowWidth / 750;
    config.platform = res.platform;
    config.statusBarHeight = res.statusBarHeight;
    if (res.platform.toLowerCase() == 'android') {
        config.capsuleHeight += 4;
    }
    config.titleHeight = (config.capsuleHeight + config.statusBarHeight) / config.pixelRate;
    if (res.statusBarHeight >= 44) {
        config.isHighHead = true;
    }
    if (res.windowHeight > 750)
        config.isAllScreen = true;
    config.systemHeight = res.windowHeight;
    console.log(config);
    return config;
};
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export function mockData(type, item, title, pageIndex, pageSize) {
    if (type === 'data') {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield delay(1000);
            resolve({
                data: item,
                status: 1
            });
        }));
    }
    else {
        const dataList = [];
        for (let i = 0; i < pageSize; i++) {
            dataList.push(Object.assign(Object.assign({}, item), { id: i + 1 + (pageIndex - 1) * pageSize, [title]: `${i + 1 + (pageIndex - 1) * pageSize}条数据` }));
        }
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            yield delay(1000);
            resolve({
                data: {
                    list: dataList,
                    pageCount: 2
                },
                status: 1
            });
        }));
    }
}
const isErrorPage = () => {
    const currentPage = getNowPage();
    return currentPage.route.indexOf('error') === -1;
};
export const gotoError = () => {
    if (isErrorPage()) {
        wx.navigateTo({
            url: '/pages/error/500/500?t=error'
        });
    }
};
const isStartPage = () => {
    const currentPage = getNowPage();
    return currentPage.route.indexOf('pages/index/index/index') === -1;
};
export const gotoLogin = () => {
    if (isStartPage()) {
        wx.reLaunch({
            url: "/pages/index/index/index"
        });
    }
};
export const myConsole = (data, _this) => {
    console.log(`页面：${_this.route}`, data);
};
export const isHaveBASEURL = (string, BASEURL) => {
    return string.indexOf(BASEURL) !== -1;
};
