# form组件相关
写这个的原因是因为，vant框架内封装的基础组件在使用的时候有些小缺陷，比如cell来写表单，发现样式需要调整，picker放在cell的value里,如何要保证与van-field的样式保持一致，input字体大小，颜色要怎么控制，如何形成统一的错误提示样式。所以借助vant的的组件来封装小程序最常用的input与picker，以及一个value为空的cell（用于放置一些自定义的表单项）。

## 使用说明
引用form组件，放在最外层。其他的组件放到form标签内即可。
页面data内需要有两个字段
1. `rules`：`interface`在`data.d.ts`中,用于校验表单数据条件，类似`async-verification`, 其中`message`字段就是在页面上可能需要显示的字段。
```typescript
rules: {
  name: {
    required: boolean,// 必填
    message: string,// 提示信息
    type?: string,// 字段类型
    pattern?: RegExp,// 正则
    min?: number,// 最小值
    max?: number,// 最大值
    validator?: Function,// 自定义校验函数
  }
}
```  
2. `error`：`interface`在`data.d.ts`中,用于与组件配合显示。
```typescript
error: {
  name: {
    key: string,
    error: boolean,// 是否错误
    message: string,// 错误提示信息
  }
}
```  
用于搭配组件控制。在输入的时候调用`form_verification.ts`内的`dataCheckItem`来校验某一项数据的错误状态，在提交的时候调用`form_verification.ts`内的`dataCheck`来校验所有字段的错误状态。

## 接口文档

### form
写表单时需要在外面包裹一层。使用了van-cell-group分组。
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|title|	分组标题	|string|	
|border|是否显示外边框|boolean|false|

--------------------------------------------------  

### cell
cell的参数与vant的保持一致，添加了value放在label下面的功能。
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|required|是否必填(必填有星号)|boolean|false|
|key|字段名| string| 
|label|	输入框左侧文本	|string|	
|titleWidth|标题宽度|string|'180rpx'|
|border|是否显示内边框|boolean|false|
|error|用于显示底部的错误，当error为true才能显示error-message|boolean|false| 
|error-message|底部错误提示文案，为空时不展示|string|
|error-message-align|底部错误提示文案对齐方式，可选值为 left/center/right|string|left|  
|lineBreak|value放在label下方|boolean|fales|  

--------------------------------------------------  

### input
input的参数大部分与vant的field保持一致。
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|required|是否必填(必填有星号)|boolean|false|
|key|字段名| string| 
|label|	输入框左侧文本	|string|	
|value|组件的值|string/number|
|type|可设置为任意原生类型, 如 number idcard textarea digit|string|text
|fixed|如果 type 为 textarea 且在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true|boolean|false|
|border|是否显示内边框|boolean|false|
|disabled|是否禁用输入框|boolean|false|
|clearable|是否启用清除控件|boolean|false|
|password|是否是密码|boolean|false|
|titleWidth|标题宽度|string|'180rpx'|
|maxlength|最大输入长度，设置为 -1 的时候不限制最大长度|number|-1|
|placeholder|输入框为空时占位符|string|
|placeholder-style|指定 placeholder 的样式|string|
|error|没有用上|boolean|false|
|error-message|底部错误提示文案，为空时不展示|string|
|error-message-align|底部错误提示文案对齐方式，可选值为 left/center/right|string|left|
|inputAlign|输入框内容对齐方式，可选值为 left/center/right|string|left|
|confirmType|设置键盘右下角按钮的文字，仅在 type='text' 时生效|string|确认|
|cursorSpacing|输入框聚焦时底部与键盘的距离	|number|	50|
|autoFocus|	自动聚焦，拉起键盘|	boolean|	false|  
  
--------------------------------------------------  

### picker 
使用van-cell，在value中添加了picker。
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|required|是否必填(必填有星号)|boolean|false|
|key|字段名| string| 
|label|	输入框左侧文本	|string|	
|value|组件的值|number/number[]/string|
|mode|selector普通选择器/multiSelector多列选择器/time	时间选择器/date日期选择器/region省市区选择器|string|selector|
|border|是否显示内边框|boolean|false|
|disabled|是否禁用输入框|boolean|false|
|titleWidth|标题宽度|string|'180rpx'|
|inputAlign|输入框内容对齐方式，可选值为 left/center/right|string|left|
|range|普通选择、多选模式下传入的数组|(string/number/object)[]|
|rangeKey|普通选择、多选模式下显示被选项文字的字段名|string|
|placeholder| 提示文本|string|请选择|
|start|mode=time表示有效时间范围的开始，字符串格式为"hh:mm"/mode=date表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"|	string|		
|end|mode=time表示有效时间范围的结束，字符串格式为"hh:mm"/mode=date表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"|	string|		
|fields|mode=date:year粒度为年,month粒度为月份,day粒度为天|string|year|
|error|没有用上|boolean|false|
|error-message|底部错误提示文案，为空时不展示|string|
|error-message-align|底部错误提示文案对齐方式，可选值为 left/center/right|string|left|