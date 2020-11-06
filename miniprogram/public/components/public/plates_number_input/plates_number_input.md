# plates-number-input相关

一个车牌输入法的组件。
`initTypewritingShow`使用对象是因为，组件的显隐组件内部有个值在控制，而这个值仅仅设置用户设置一次车牌号的显示状态，如果两次都是false，则插件的watch不能监听到变化，而使用对象则可以每次变化都生效。
`initData`是数组，一位装车牌号一个字符。
| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|initTypewritingShow|	初始化键盘是否出现	| {value:boolean} | {value:false} |	
|initData|默认填到格子里的车牌号数据|string[]|[]
---------------------------------------------------

|事件 | 解释| 类型|
|-----|-----|-----|-----|
|bindchangeplatesnumber| 车牌号变化事件 | Function({value:string（车牌号）,valueArr: string[]（车牌号数组）})
