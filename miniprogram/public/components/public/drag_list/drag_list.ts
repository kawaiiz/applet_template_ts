import { DragItemInfo } from "../drag_item/data";

type InitData = {
  childInfo: DragItemInfo[],
  timer: any
}

type InitProperty = {}

type InitMethod = {
  _updateDataChange: () => void,
  getChildInfo: (item: any) => Promise<DragItemInfo>,
  handleItemChange: (data: { index: number, translateY: number }) => void
  compute: (nowItem: DragItemInfo, target: DragItemInfo, translateY: number, type: 'top' | 'bottom') => boolean
}

Component<InitData, InitProperty, InitMethod>({
  options: {
    addGlobalClass: true,
  },
  /** 
   * 组件的属性列表
   */
  properties: {

  },

  relations: {
    '../drag_item/drag_item': {
      type: 'child',
      linked(_target) {
        this._updateDataChange()
      },
      linkChanged() {
      },
      unlinked() {
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    childInfo: [],
    timer: null
  },
  observers: {
    'childInfo.**': function (_childInfo) {
      // console.log(childInfo)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取组件的布局信息 
    getChildInfo(item) {
      return new Promise((resolve) => {
        const query = wx.createSelectorQuery().in(item);
        const className = '.drag-item';
        query.select(className).boundingClientRect((res) => {
          resolve({
            top: res.top,
            left: res.left,
            right: res.right,
            bottom: res.bottom,
            height: res.height
          })
        }).exec()
      })
    },
    // 更新列表数据
    async _updateDataChange() {
      /*
       * 使用函数节流限制重复去设置数组内容进而限制多次重复渲染
       * 暂时没有研究微信在渲染的时候是否会进行函数节流
       */
      if (this.data.timer) {
        clearTimeout(this.data.timer)
        this.setData({
          timer: null
        })
      }
      const childComponent = this.getRelationNodes('../drag_item/drag_item')
      this.data.timer = setTimeout(async () => {
        const promiseAllList: Promise<DragItemInfo>[] = []
        childComponent.forEach((item, _index) => {
          promiseAllList.push(this.getChildInfo(item))
        })
        const res = await Promise.all(promiseAllList)
        this.setData({
          childInfo: res
        })
      }, 100);
      this.setData({
        timer: this.data.timer
      })
    },
    // 子组件拖动停止 根据传来的index 和本次的偏移量来算出他是挪到哪个专业的位置 将 指定子专业与目标专业
    handleItemChange(data: { index: number, translateY: number }) {
      const { index, translateY } = data
      const { childInfo } = this.data
      let i: number
      if (translateY > 0) {
        i = index + 1
        for (i; i < childInfo.length; i++) {
          if (this.compute(childInfo[index], childInfo[i], translateY, 'bottom')) {
            this.triggerEvent('indexChange', { from: index, to: i })
            return
          }
        }
        // 当循环都找不到 说明拖曳超过可最大高度
        this.triggerEvent('indexChange', { from: index, to: childInfo.length - 1 })
      } else {
        i = index - 1
        for (i; i >= 0; i--) {
          if (this.compute(childInfo[index], childInfo[i], translateY, 'top')) {
            this.triggerEvent('indexChange', { from: index, to: i })
            return
          }
        }
        // 当循环都找不到 说明拖曳超过可最小高度
        this.triggerEvent('indexChange', { from: index, to: 0 })
      }
    },
    // 判断专业是否拖动到 目标专业的区域 在就返回true
    compute(nowItem, target, translateY, type) {
      const Y = nowItem[type] + translateY
      return Y > target.top && Y < target.bottom
    }
  }
})

export { }