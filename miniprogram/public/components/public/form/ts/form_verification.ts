import { Rules, Rule, FormItemError } from './data'
/**
 * @param {Rule} rules 表单配置
 * @param {value} 字段值 表单配置
 * @param {key} 字段名
 * @param {_this} 当前页面实例
 * @returns  {key:string,status:boolean,message:string} 
 */


export const dataCheckItem = <K>(rule: Rule, value: any, key: string, _this?: K): FormItemError => {
  const valueType = typeof value
  const errorInfo: FormItemError = {
    key,
    error: true,
    message: ''
  }
  // 有校验函数优先调用函数
  if (rule.validator) {
    const { error, message } = rule.validator(rule, value, key, _this)
    if (error) {
      errorInfo.message = message || rule.message
      return errorInfo
    }
  }
  // 必填检测 
  if (rule.required &&
    (valueType === 'undefined' || (valueType === 'number' && isNaN(value)) || value === null || ((valueType === 'string' || Array.isArray(value)) && value.length === 0))
  ) {
    errorInfo.message = rule.message
    return errorInfo
  }
  if (rule.type && valueType !== rule.type && !(rule.type === 'array' && Array.isArray(value)) && !(rule.type === 'number' && !isNaN(Number(value)) && Number(value).toString().length === value.length)) {
    errorInfo.message = '值类型与预期类型不同~'
    return errorInfo
  }

  // 最大值最小值判断
  if (typeof rule.min !== 'undefined' && rule.type === 'number' && Number(value) < rule.min) {
    errorInfo.message = `请输入大于${rule.min}的数值`
    return errorInfo
  }
  if (typeof rule.max !== 'undefined' && rule.type === 'number' && Number(value) > rule.max) {
    errorInfo.message = `请输入小于${rule.min}的数值`
    return errorInfo
  }
  return {
    key,
    error: false,
    message: ''
  }
}

/**
 * @param {Rules} rules 表单配置
 * @param {any} requestData 表单配置
 * @param {any} _this 当前页面实例
 * @returns {object} {errorsArr:[{key:string,status:boolean,message:string}],errorsObj:{}} 
 */


export const dataCheck = <T, K>(rules: Rules<T>, requestData: T, _this?: K) => {
  const errorArr: { key: string, error: boolean, message: string }[] = []
  const errorObj: {
    [key: string]: FormItemError
  } = {}
  const requestDataKey = Object.keys(rules as {
    [key in keyof T]: Rule
  })
  requestDataKey.forEach((item) => {
    const rule = rules[item as keyof T]
    const value = requestData[item as keyof T]
    const errorInfo = dataCheckItem(rule, value, item, _this)
    if (errorInfo.error) {
      errorArr.push(errorInfo)
      errorObj[item] = errorInfo
    }
  })
  return {
    errorArr,
    errorObj
  }
}