# tabs相关

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|initTabCurrent|	初始选择项	|number| 0 |	
|tabTextKey|显示字段的key	|string| '' |	
|backgroundColor|背景色	|string| '#fff' |	
|color|非活跃色	|string| '#aaa' |	
|activeColor|活跃色	|string| '#333' |	
|boxShadow|阴影	|string| '#333' |	
|dataList|tabs的数组|string|


----------------------------

|事件 | 解释| 类型|
|-----|-----|-----|-----|
|bindchangetabcurrent| 序号变化事件 | Function({ value:number(最新的活跃项序号)})
