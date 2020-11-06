# tabs相关

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|initTabCurrent|	初始选择项	|number| 0 |	
|dataList|tabs的数组|string|
|imageList|初始化数组|{path:'图片地址',[key:string]:any}[] / string[]|
|maxLength|最大上传数量|number|1000000|
|token|请求携带的凭证|string|
|onlyShow|是否仅查看|boolean|false|

----------------------------

|事件 | 解释| 类型|
|-----|-----|-----|-----|
|bindchangetabcurrent| 序号变化事件 | Function({ value:number(最新的活跃项序号)})
