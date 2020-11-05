var operationNumber = function (arg1, arg2, operator) {
    var oper = ['+', '-', '*', '/'];
    if (isNaN(arg1) || isNaN(arg2) || oper.indexOf(operator) < 0) {
        return NaN;
    }
    if (operator === '/' && Number(arg2) === 0) {
        return Infinity;
    }
    if (operator === '*' && Number(arg2) === 0) {
        return 0;
    }
    if ((arg1 === arg2 || Number(arg1) === Number(arg2)) && operator === '-') {
        return 0;
    }
    var r1, r2, max, _r1, _r2;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    max = Math.max(r1, r2);
    _r1 = max - r1;
    _r2 = max - r2;
    let newArg1 = String(arg1);
    let newArg2 = String(arg2);
    if (_r1 !== 0) {
        newArg1 = arg1 + '0'.repeat(_r1);
    }
    if (_r2 !== 0) {
        newArg2 = arg2 + '0'.repeat(_r2);
    }
    arg1 = Number(newArg1.replace('.', ''));
    arg2 = Number(newArg2.replace('.', ''));
    var r3 = operator === '*' ? (max * 2) : (operator === '/' ? 0 : max);
    var newNum = 0;
    if (operator === '+') {
        newNum = arg1 + arg2;
    }
    else if (operator === '-') {
        newNum = arg1 - arg2;
    }
    else if (operator === '*') {
        newNum = arg1 * arg2;
    }
    else if (operator === '/') {
        newNum = arg1 / arg2;
    }
    if (r3 !== 0) {
        var nStr = newNum.toString();
        nStr = nStr.replace(/^-/, '');
        if (nStr.length < r3 + 1) {
            nStr = '0'.repeat(r3 + 1 - nStr.length) + nStr;
        }
        nStr = nStr.replace(new RegExp('(\\\d{' + r3 + '})$'), '.$1');
        if (newNum < 0) {
            nStr = '-' + nStr;
        }
        newNum = Number(nStr);
    }
    return newNum;
};
export function toolAdd(arg1, arg2) {
    return operationNumber(arg1, arg2, '+');
}
export function toolSub(arg1, arg2) {
    return operationNumber(arg1, arg2, '-');
}
export function toolMul(arg1, arg2) {
    return operationNumber(arg1, arg2, '*');
}
export function toolDiv(arg1, arg2) {
    return operationNumber(arg1, arg2, '/');
}
export function toolNumber(num) {
    var num_str = num.toString();
    if (num_str.indexOf("+") != -1) {
        num_str = num_str.replace("+", "");
    }
    if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
        var resValue = "", power = "", result = null, dotIndex = 0, resArr = [], sym = "";
        var numStr = num_str.toString();
        if (numStr[0] == "-") {
            numStr = numStr.substr(1);
            sym = "-";
        }
        if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
            var regExp = new RegExp("^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$", "ig");
            result = regExp.exec(numStr);
            if (result != null) {
                resValue = result[2];
                power = result[5];
                result = null;
            }
            if (!resValue && !power) {
                return false;
            }
            dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
            resValue = resValue.replace(".", "");
            resArr = resValue.split("");
            if (Number(power) >= 0) {
                var subres = resValue.substr(dotIndex);
                power = Number(power);
                for (var i = 0; i <= power - subres.length; i++) {
                    resArr.push("0");
                }
                if (power - subres.length < 0) {
                    resArr.splice(dotIndex + power, 0, ".");
                }
            }
            else {
                power = power.replace("-", "");
                power = Number(power);
                for (var i = 0; i < power - dotIndex; i++) {
                    resArr.unshift("0");
                }
                var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
                resArr.splice(n, 0, ".");
            }
        }
        resValue = resArr.join("");
        return sym + resValue;
    }
    else {
        return num_str;
    }
}
export function getDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 100) / 100;
    return s;
}
export const toTree = (arr, pID) => {
    const ids = arr.map(a => a.id);
    const arrNotParent = arr.filter(({ pId }) => pId && !ids.includes(pId));
    const _ = (arr, pID) => arr
        .filter(({ pId }) => pId == pID)
        .map(a => (Object.assign(Object.assign({}, a), { children: _(arr.filter(({ pId }) => pId != pID), a.id) })));
    return _(arr, pID).concat(arrNotParent);
};
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
export const getQueryString = (query, name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = query.match(reg);
    return r ? decodeURIComponent(r[2]) : null;
};
