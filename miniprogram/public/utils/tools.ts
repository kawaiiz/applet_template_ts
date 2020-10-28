var operationNumber = function (arg1: number, arg2: number, operator: string): number {
  var oper = ['+', '-', '*', '/'];
  // 不合法的运算
  if (isNaN(arg1) || isNaN(arg2) || oper.indexOf(operator) < 0) {
    return NaN;
  }
  // 除以0
  if (operator === '/' && Number(arg2) === 0) {
    return Infinity;
  }
  // 和0相乘
  if (operator === '*' && Number(arg2) === 0) {
    return 0;
  }
  // 相等两个数字相减
  if ((arg1 === arg2 || Number(arg1) === Number(arg2)) && operator === '-') {
    return 0;
  }
  var r1, r2, max, _r1, _r2;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  max = Math.max(r1, r2)
  _r1 = max - r1;
  _r2 = max - r2;
  let newArg1 = String(arg1)
  let newArg2 = String(arg2)
  if (_r1 !== 0) {
    newArg1 = arg1 + '0'.repeat(_r1)
  }
  if (_r2 !== 0) {
    newArg2 = arg2 + '0'.repeat(_r2)
  }
  arg1 = Number(newArg1.replace('.', ''))
  arg2 = Number(newArg2.replace('.', ''))
  var r3 = operator === '*' ? (max * 2) : (operator === '/' ? 0 : max);
  var newNum = 0
  if (operator === '+') {
    newNum = arg1 + arg2
  } else if (operator === '-') {
    newNum = arg1 - arg2
  } else if (operator === '*') {
    newNum = arg1 * arg2
  } else if (operator === '/') {
    newNum = arg1 / arg2
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
}
//加法 
export function toolAdd(arg1: number, arg2: number): number {
  return operationNumber(arg1, arg2, '+');
}
//减法 
export function toolSub(arg1: number, arg2: number): number {
  return operationNumber(arg1, arg2, '-');
}
//乘法 
export function toolMul(arg1: number, arg2: number): number {
  return operationNumber(arg1, arg2, '*');
}
// 除法
export function toolDiv(arg1: number, arg2: number): number {
  return operationNumber(arg1, arg2, '/');
}

// 将科学记数法用数字显示
export function toolNumber(num: number) {
  var num_str = num.toString();
  if (num_str.indexOf("+") != -1) {
    num_str = num_str.replace("+", "");
  }
  if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
    var resValue = "",
      power: number | string = "",
      result = null,
      dotIndex = 0,
      resArr: any[] = [],
      sym = "";
    var numStr = num_str.toString();
    if (numStr[0] == "-") {
      // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
      numStr = numStr.substr(1);
      sym = "-";
    }
    if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
      var regExp = new RegExp(
        "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
        "ig"
      );
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
        //幂数大于小数点后面的数字位数时，后面加0
        for (var i = 0; i <= power - subres.length; i++) {
          resArr.push("0");
        }
        if (power - subres.length < 0) {
          resArr.splice(dotIndex + power, 0, ".");
        }
      } else {
        power = power.replace("-", "");
        power = Number(power);
        //幂数大于等于 小数点的index位置, 前面加0
        for (var i = 0; i < power - dotIndex; i++) {
          resArr.unshift("0");
        }
        var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
        resArr.splice(n, 0, ".");
      }
    }
    resValue = resArr.join("");

    return sym + resValue;
  } else {
    return num_str;
  }
}

// 根据两点经纬度算两点距离
export function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;// EARTH_RADIUS;
  s = Math.round(s * 100) / 100;
  return s;
}


/**
 * @param {Number|null} arr 一维数组
 * @param {Number|null} pID 父ID
 * @desc 将扁平的一维数组 转成多维 
 */
export const toTree = (arr: any[], pID: number) => {
  const ids: number[] = arr.map(a => a.id as number) // 获取所有的id
  const arrNotParent = arr.filter(
    ({ pId }) => pId && !ids.includes(pId)// 返回所有父id存在 且 父id不存在与所有的资源id数组中  
  )
  const _ = (arr: any[], pID: string | number | null): any[] =>
    arr
      .filter(({ pId }) => pId == pID)
      .map(a => ({
        ...a,
        children: _(arr.filter(({ pId }) => pId != pID), a.id),
      }))
  // 这里 pID=0是因为后台设置一级页面的父id都是0
  return _(arr, pID).concat(arrNotParent)
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */

export function getHandledValue(num: number) {
  return num < 10 ? "0" + num : num.toString();
} // 处理日期数据

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，不传则返回年开头的完整时间
 */
export interface GetDateInterface {
  time: string;
  year: number;
  month: string;
  date: string;
  hours: string;
  minutes: string;
  second: string;
}
export function getDate(data: Date | string | number, startType?: "yyyy-mm-dd" | "yyyy-mm-dd hh:mm:ss" | "yyyymmddhh hhmm" | "hh:mm" | "yyyy年mm月dd日"): GetDateInterface {
  // 传 时间或时间戳
  let d: Date
  if (typeof data === "object") {
    d = data
  } else if (typeof data === "string") {
    d = new Date(data);
  } else if (typeof data === "number") {
    if (!isMillisecond(data)) {
      d = new Date(data * 1000);
    } else {
      d = new Date(data);
    }
  } else {
    d = new Date(data);
  }
  let year = d.getFullYear();
  let month = getHandledValue(d.getMonth() + 1);
  let date = getHandledValue(d.getDate());
  let hours = getHandledValue(d.getHours());
  let minutes = getHandledValue(d.getMinutes());
  let second = getHandledValue(d.getSeconds());
  let resStr = "";
  if (startType === "yyyy-mm-dd") resStr = year + "-" + month + "-" + date; else if (startType === "yyyy-mm-dd hh:mm:ss") resStr = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + second; else if (startType === "yyyymmddhh hhmm") resStr = year + month + date + " " + hours + minutes; else if (startType === "hh:mm") resStr = hours + ":" + minutes; else if (startType === "yyyy年mm月dd日") resStr = year + "年" + month + "月" + date + "日"; else resStr = month + "-" + date + " " + hours + ":" + minutes;
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

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = (timeStamp: number) => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp: number, currentTime: number) => {
  return timeStamp < currentTime
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = (timeStamp: number) => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  let currentTime = new Date().getTime()
  const IS_MILLISECOND_CURRENT = isMillisecond(currentTime)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND_CURRENT) Math.floor(currentTime /= 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = Number((currentTime - timeStamp).toFixed(0))
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ""
  const dirStr = IS_EARLY ? "前" : "后"
  // 少于等于59秒
  if (diff <= 59) resStr = diff + "秒" + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + "分钟" + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + "小时" + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + "天" + dirStr
  else resStr = getDate(timeStamp, "yyyy-mm-dd hh:mm:ss").time
  return resStr
}


/**
 * @param {Number|null} timeSecond 秒数
 * @returns {String} 00:03时间字符串
 */
export const getTimeStr = (timeSecond: number | null) => {
  timeSecond = timeSecond ? timeSecond : 0
  const min = Math.floor(timeSecond / 60)
  const second = Number((timeSecond - min * 60).toFixed(0))
  return `${getHandledValue(min)}: ${getHandledValue(second)}`
}

/**
 * @desc 获取url参数的值
 * @param {string} timeStamp 请求参数字符串
 * @param {string} startType 需要的参数
 */
export const getQueryString = (query: string, name: string) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = query.match(reg);
  //if (r!=null) return r[2]; return '';
  return r ? decodeURIComponent(r[2]) : null;
}
