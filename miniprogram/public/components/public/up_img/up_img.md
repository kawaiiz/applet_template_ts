# 上传图集组件相关

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|BASEURL|	请求域名	|string|	
|upFileUrl|上传地址|string|
|imageList|初始化数组|{path:'图片地址',[key:string]:any}[] / string[]|
|maxLength|最大上传数量|number|1000000|
|token|请求携带的凭证|string|
|onlyShow|是否仅查看|boolean|false|

----------------------------

|事件 | 解释| 类型|
|-----|-----|-----|-----|
|bindchangevaluelist| 图片值变化事件 | Function({ value:any[](valueList) })
|bindchangedisabled| 上传图片有个禁用时间 | Function({ value:boolean(disabled) })
  

tip： imageList这个属性赋值不能拿接收change事件的值的变量填充，会导致无限循环，初始化页面单独拿个数组来设置这个imageList