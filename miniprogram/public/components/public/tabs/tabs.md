# tabs相关

| 参数 | 说明 | 类型 | 默认值 |
|-----|-----|-----|-----|
|initTabCurrent|	初始选择项	|number| 0 |	
|dataList|tabs的数组|array| []
|tabTextKey|显示的文字的key|string| []
|backgroundColor|背景颜色|string| #fff
|color|非活跃颜色|string| #aaa
|activeColor|活跃颜色|string| #333
|borderRadius|tabs的圆角是否出现|boolean|true
|boxShadow|box-shadow|boolean|true


----------------------------

|事件 | 解释| 类型|
|-----|-----|-----|-----|
|bindchangetabcurrent| 序号变化事件 | Function({ value:number(最新的活跃项序号)})
