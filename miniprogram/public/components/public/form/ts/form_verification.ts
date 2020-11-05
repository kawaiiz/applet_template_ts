import { Rules, Rule, FormItemError } from './data'
/**
 * @param {Rule} rules 表单配置
 * @param {value} 字段值 表单配置
 * @param {key} 字段名
 * @returns  {key:string,status:boolean,message:string} 
 */


export const dataCheckItem = (rule: Rule, value: any, key: string): FormItemError => {
  const valueType = typeof value
  const errorInfo: FormItemError = {
    key,
    error: true,
    message: ''
  }
  // 有校验函数优先调用函数
  if (rule.validator && !rule.validator()) {
    errorInfo.message = rule.message
    return errorInfo
  }
  // 必填检测 
  if (rule.required &&
    (valueType === undefined ||
      value === null ||
      isNaN(value) ||
      ((valueType === 'string' || Array.isArray(value)) && value.length === 0))
  ) {
    errorInfo.message = rule.message
    return errorInfo
  }
  // 类型检测
  if (rule.type && valueType !== rule.type) {
    errorInfo.message = '数据类型错误，请检查'
    return errorInfo
  }
  // 正则检测
  if (rule.pattern && !rule.pattern.test(value)) {
    errorInfo.message = rule.message
    return errorInfo
  }
  // 最大值最小值判断
  if (rule.min && valueType === 'number' && value < rule.min) {
    errorInfo.message = `请输入大于${rule.min}的数值`
    return errorInfo
  }
  if (rule.max && valueType === 'number' && value > rule.max) {
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
 * @returns {object} {errorsArr:[{key:string,status:boolean,message:string}],errorsObj:{}} 
 */


export const dataCheck = (rules: Rules, requestData: any) => {
  const errorArr: { key: string, error: boolean, message: string }[] = []
  const errorObj: {
    [key: string]: FormItemError
  } = {}
  const requestDataKey = Object.keys(rules)
  requestDataKey.forEach(item => {
    const rule = rules[item]
    const value = requestData[item]
    const errorInfo = dataCheckItem(rule, value, item)
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