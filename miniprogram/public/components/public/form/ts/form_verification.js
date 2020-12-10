export const dataCheckItem = (rule, value, key, _this) => {
    const valueType = typeof value;
    const errorInfo = {
        key,
        error: true,
        message: ''
    };
    if (rule.validator) {
        const { error, message } = rule.validator(rule, value, key, _this);
        if (error) {
            errorInfo.message = message || rule.message;
            return errorInfo;
        }
    }
    if (rule.required &&
        (valueType === 'undefined' || (valueType === 'number' && isNaN(value)) || value === null || ((valueType === 'string' || Array.isArray(value)) && value.length === 0))) {
        errorInfo.message = rule.message;
        return errorInfo;
    }
    if (rule.type && valueType !== rule.type && !(rule.type === 'array' && Array.isArray(value)) && !(rule.type === 'number' && !isNaN(Number(value)) && Number(value).toString().length === value.length)) {
        errorInfo.message = '值类型与预期类型不同~';
        return errorInfo;
    }
    if (typeof rule.min !== 'undefined' && rule.type === 'number' && Number(value) < rule.min) {
        errorInfo.message = `请输入大于${rule.min}的数值`;
        return errorInfo;
    }
    if (typeof rule.max !== 'undefined' && rule.type === 'number' && Number(value) > rule.max) {
        errorInfo.message = `请输入小于${rule.min}的数值`;
        return errorInfo;
    }
    return {
        key,
        error: false,
        message: ''
    };
};
export const dataCheck = (rules, requestData, _this) => {
    const errorArr = [];
    const errorObj = {};
    const requestDataKey = Object.keys(rules);
    requestDataKey.forEach((item) => {
        const rule = rules[item];
        const value = requestData[item];
        const errorInfo = dataCheckItem(rule, value, item, _this);
        if (errorInfo.error) {
            errorArr.push(errorInfo);
            errorObj[item] = errorInfo;
        }
    });
    return {
        errorArr,
        errorObj
    };
};
