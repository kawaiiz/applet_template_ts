export interface Rule {
  required: boolean,// 必填
  message: string,// 提示信息
  type?: string,// 字段类型
  pattern?: () => RegExp,// 正则  data里放正则会变成对象
  min?: number,// 最小值
  max?: number,// 最大值
  validator?: (rule: Rule, value: any, key: string, _this?: any) => {
    error: boolean, message?: string
  },// 自定义校验函数
}

// 表单的rules字段
export type Rules<T> = {
  [key in keyof T]: Rule
}

export interface FormItemError {
  key: string,
  error: boolean,// 是否错误
  message: string,// 错误提示信息
}

export interface ReturnDataCheckError {
  errorArr: FormItemError[],
  errorObj: {
    [key: string]: FormItemError
  }
}