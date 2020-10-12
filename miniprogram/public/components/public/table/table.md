# 使用说明

该组件具有 列表展示模式，勾选模式

1. 属性介绍
必传项：`columns`, `dataList`  
参数含义
`columns`的`interface`已定义，在`data.d.ts`累。  
`scrollViewHeight`控制可滚动区域高度。  
`rowKey`用于指明行的唯一标识符，在勾选中有使用。  
`getListLoading`请求列表的loading  
`showTipImage`无数据时的提示文本
`tipTitle`无数据时的提示文本主标题  
`tipSubtitle`无数据时的提示文本副标题标题  
`select`控制是否出现勾选。  
`selectKey`勾选的初始值  
`generic:action-td`当列表项内具有操作列，操作列的内容需要自定义时，使用到了抽象节点，该属性指明抽象节点的组件。操作列位置可以不固定，如需多个操作列要修改内部代码，内容不限,点击事件由`bindclickaction`触发，抽象节点的组件代码在下面贴出。  
2. 事件介绍  
`bindcheckkey`勾选事件 返回被勾选项的rowKey数组
`bindclicklistitem`点击列表行事件 
`bindscrolltolower`,`bindscrolltoupper`滚动触底/滚动触顶事件
`bindclickaction`点击抽象节点内的代码

3. 使用代码  
引入组件的代码  
```html
<my-table 
scrollViewHeight="{{tableScrollViewHeight}}" 
columns="{{tableColumns}}" 
dataList="{{dataList}}" 
getListLoading="{{getListLoading}}" 
showTipImage="{{dataList.length===0}}" 
tipTitle="今日未招人" 
tipSubtitle="明日继续努力" 
generic:action-td="action-td" 
select="{{true}}" 
selectKey="{{[2,4,5]}}" 

bindcheckkey="handleCheckTable" 
bindclicklistitem="handleClickListItem" 
bindscrolltolower="getList" 
bindclickaction="handleClickActionBtn" 
/>
```   
action-td的目标组件代码
```html
<view class="action-box box box-row-center">
  <view class="button close box box-row-center-wrap" size="mini" catchtap="handleClickBtn" data-type="close" wx:if="{{index%2===0}}">
    禁用
  </view>
  <view class="button open box box-row-center-wrap" size="mini" catchtap="handleClickBtn" data-type="open" wx:else>
    启用
  </view>
</view>
```
```typescript
  /**
   * 组件的方法列表
   */
  methods: {
    handleClickBtn(e) {
      const { type } = e.currentTarget.dataset
      const { index, item } = this.dataset
      this.triggerEvent('clickaction', {
        value: type,
        index, item
      })
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    ready: function () {
      this.setData({
        index: this.dataset.index
      })
    },
    moved: function () { },
    detached: function () { },
  },
```
点击触发自定义事件`clickaction`, 需要传输`{ value: '当前点击的事件类型，在引用页面内通过该字段判断触发的是哪个事件',index:'点击的当前行序号', item:'当前行数据'}`，抽象节点的`props`有问题，但是`dataset`可以使用，所以在生命周期`ready`内需要初始化赋值。点击事件使用`catchtap`，不然会触发`bindclicklistitem`事件，看项目需求使用
`catchtap`/`bindtap`


