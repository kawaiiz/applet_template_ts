export const dataCheckItem = (rule, value, key) => {
    const valueType = typeof value;
    const errorInfo = {
        key,
        error: true,
        message: ''
    };
    if (rule.validator && !rule.validator()) {
        errorInfo.message = rule.message;
        return errorInfo;
    }
    if (rule.required &&
        (valueType === undefined || (valueType === 'number' && isNaN(value)) || value === null || ((valueType === 'string' || Array.isArray(value)) && value.length === 0))) {
        errorInfo.message = rule.message;
        return errorInfo;
    }
    if (rule.min && valueType === 'number' && value < rule.min) {
        errorInfo.message = `请输入大于${rule.min}的数值`;
        return errorInfo;
    }
    if (rule.max && valueType === 'number' && value > rule.max) {
        errorInfo.message = `请输入小于${rule.min}的数值`;
        return errorInfo;
    }
    return {
        key,
        error: false,
        message: ''
    };
};
export const dataCheck = (rules, requestData) => {
    const errorArr = [];
    const errorObj = {};
    const requestDataKey = Object.keys(rules);
    requestDataKey.forEach(item => {
        const rule = rules[item];
        const value = requestData[item];
        const errorInfo = dataCheckItem(rule, value, item);
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
