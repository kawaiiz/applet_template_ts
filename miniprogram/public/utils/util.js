export function getHandledValue(num) {
    return num < 10 ? "0" + num : num.toString();
}
export function getDate(data, startType) {
    let d;
    if (typeof data === "object") {
        d = data;
    }
    else if (typeof data === "string") {
        d = new Date(data);
    }
    else if (typeof data === "number") {
        if (!isMillisecond(data)) {
            d = new Date(data * 1000);
        }
        else {
            d = new Date(data);
        }
    }
    else {
        d = new Date(data);
    }
    let year = d.getFullYear();
    let month = getHandledValue(d.getMonth() + 1);
    let date = getHandledValue(d.getDate());
    let hours = getHandledValue(d.getHours());
    let minutes = getHandledValue(d.getMinutes());
    let second = getHandledValue(d.getSeconds());
    let resStr = "";
    if (startType === "yyyy-mm-dd")
        resStr = year + "-" + month + "-" + date;
    else if (startType === "yyyy-mm-dd hh:mm:ss")
        resStr = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + second;
    else if (startType === "yyyymmddhh hhmm")
        resStr = year + month + date + " " + hours + minutes;
    else if (startType === "hh:mm")
        resStr = hours + ":" + minutes;
    else if (startType === "yyyy年mm月dd日")
        resStr = year + "年" + month + "月" + date + "日";
    else
        resStr = month + "-" + date + " " + hours + ":" + minutes;
    return {
        time: resStr,
        year: year,
        month: month,
        date: date,
        hours: hours,
        minutes: minutes,
        second: second
    };
}
export const getQueryString = (query, name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = query.match(reg);
    return r ? decodeURIComponent(r[2]) : null;
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
    const time = duration || 1000;
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
const isMillisecond = (timeStamp) => {
    const timeStr = String(timeStamp);
    return timeStr.length > 10;
};
const isEarly = (timeStamp, currentTime) => {
    return timeStamp < currentTime;
};
export const getRelativeTime = (timeStamp) => {
    const IS_MILLISECOND = isMillisecond(timeStamp);
    if (IS_MILLISECOND)
        Math.floor(timeStamp /= 1000);
    timeStamp = Number(timeStamp);
    let currentTime = new Date().getTime();
    const IS_MILLISECOND_CURRENT = isMillisecond(currentTime);
    if (IS_MILLISECOND_CURRENT)
        Math.floor(currentTime /= 1000);
    const IS_EARLY = isEarly(timeStamp, currentTime);
    let diff = Number((currentTime - timeStamp).toFixed(0));
    if (!IS_EARLY)
        diff = -diff;
    let resStr = "";
    const dirStr = IS_EARLY ? "前" : "后";
    if (diff <= 59)
        resStr = diff + "秒" + dirStr;
    else if (diff > 59 && diff <= 3599)
        resStr = Math.floor(diff / 60) + "分钟" + dirStr;
    else if (diff > 3599 && diff <= 86399)
        resStr = Math.floor(diff / 3600) + "小时" + dirStr;
    else if (diff > 86399 && diff <= 2623859)
        resStr = Math.floor(diff / 86400) + "天" + dirStr;
    else
        resStr = getDate(timeStamp, "yyyy-mm-dd hh:mm:ss").time;
    return resStr;
};
export const getTimeStr = (timeSecond) => {
    timeSecond = timeSecond ? timeSecond : 0;
    const min = Math.floor(timeSecond / 60);
    const second = Number((timeSecond - min * 60).toFixed(0));
    return `${getHandledValue(min)}: ${getHandledValue(second)}`;
};
export const observe = (obj, key, fnList, deep, startObj, startKey) => {
    let val = obj[key];
    if (deep && val != null && typeof val === 'object') {
        Object.keys(val).forEach(childKey => {
            observe(val, childKey, fnList, deep, startObj || obj, startKey || key);
        });
    }
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        set: function (value) {
            val = value;
            fnList.forEach((item) => {
                item(startObj && startKey ? startObj[startKey] : value);
            });
        },
        get: function () {
            return val;
        }
    });
};
