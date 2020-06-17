const _ = require('../../../../miniprogram_npm/lodash/index');

import { DragItemInfo } from "./data";
interface InitData {
  itemInfo: DragItemInfo | {},
  scale: number,
  translateX: number,
  translateY: number,
  isSuccessAction: boolean,
  isActive: boolean,
  start: {
    x: number,
    y: number
  }
}

// interface InitProperty { }

interface InitMethod {
  emitParentEvent: () => void,
  [methodName: string]: (...arg: any) => any
}

Component<InitData, any, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /** 
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number
    },
    maxIndex: {
      type: Number
    }
  },

  relations: {
    '../drag_list/drag_list': {
      type: 'parent',
      linked() {
      },
      linkChanged() {
      },
      unlinked() {
      }
    }
  },

  lifetimes: {
    ready() {
      this.initData()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    itemInfo: {},
    scale: 1,
    translateX: 0,
    translateY: 0,
    isSuccessAction: false,// 是否是正确的活动
    isActive: false,// 是否开始活动
    start: {
      x: 0,
      y: 0
    }
  },

  /** 
   * 组件的方法列表
   */
  methods: {
    initData() {
      const query = this.createSelectorQuery();
      const className = '.drag-item';
      query.select(className).boundingClientRect((res) => {
        this.setData({
          itemInfo: {
            top: res.top,
            left: res.left,
            right: res.right,
            bottom: res.bottom,
            height: res.height
          }
        })
      }).exec()
    },
    // 长按选取
    handleLongpressItem(e: any) {
      wx.vibrateShort()
      this.setData({
        isActive: true,
        scale: 1.1,
        start: {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        }
      })
    },
    // 移动进行时
    handleTouchmove: _.throttle(async function (this: WechatMiniprogram.Component.Instance<InitData, any, InitMethod>, e: any) {
      const { isActive, start } = this.data
      if (!isActive) return
      console.log(e)
      const { pageY } = e.touches[0]
      this.setData({
        translateY: pageY - start.y
      })
    }, 300, {
      leading: false,
      trailing: true
    }),
    // 移动结束
    handleTouchend(_e: any) {
      // console.log(e)
      this.setData({
        isActive: false,
        scale: 1,
      }, this.emitParentEvent)
    },
    // 触发父元素事件
    emitParentEvent() {
      const parentComponent: any[] = this.getRelationNodes('../drag_list/drag_list')
      const { index, translateY, itemInfo, maxIndex } = this.data
      // 当位移的距离是在当前这个移动块的高度时，不触发事件 当目标是第一个块 再往上移动没有意义，同理 最后一个也是 , 为了和水平事件区分开，所以要求竖直的高度要偏移超过当前块的高度的一半
      if (!(
        (Math.abs(translateY) < (itemInfo as DragItemInfo).height / 2) ||
        (translateY < 0 && index === 0) ||
        (translateY > 0 && index === maxIndex)
      )) {
        parentComponent[0].handleItemChange({ index, translateY })
      }
      this.setData({
        translateY: 0
      })
    }
  }
})

export { }