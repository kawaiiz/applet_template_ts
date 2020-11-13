export interface Rule {
  required: boolean,// 必填
  message: string,// 提示信息
  type?: string,// 字段类型
  pattern?: RegExp,// 正则
  min?: number,// 最小值
  max?: number,// 最大值
  validator?: Function,// 自定义校验函数
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