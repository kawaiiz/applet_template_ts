const computedBehavior = require('miniprogram-computed')
import { getNowPage } from '../../../utils/util'

type InitData = {
  scrollTop: number,
  checkObj: {
    [key: string]: boolean,
  } // 用于存储勾选信息
}

type InitProperty = {
  rowKey: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  scrollViewHeight: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  columns: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  dataList: WechatMiniprogram.Component.FullProperty<ArrayConstructor>,
  getListLoading: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  showTipImage: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  tipTitle: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  tipSubtitle: WechatMiniprogram.Component.FullProperty<StringConstructor>,
  select: WechatMiniprogram.Component.FullProperty<BooleanConstructor>,
  selectKey: WechatMiniprogram.Component.FullProperty<ArrayConstructor>
}

type InitMethod = {
  setScrollTop(): void,
  handleScrolltolower(): void,
  handleScrolltoupper(): void,
  handleClickListItem(e: GlobalData.WxAppletsEvent): void,
  handleClickActionBtn(e: GlobalData.WxAppletsEvent): void,
  handleClickCheck(e: GlobalData.WxAppletsEvent): void
}

Component<InitData, InitProperty, InitMethod>({
  behaviors: [computedBehavior],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    rowKey: {
      type: String,
      value: 'id'
    }, // 指明datalist里item的哪一项可以用作是key
    scrollViewHeight: {
      type: String,
      value: '200rpx'
    }, // 表格数据块高度
    columns: {
      type: Array,
      value: []
    }, // 表头
    dataList: {
      type: Array,
      value: []
    }, // 数据
    getListLoading: {
      type: Boolean,
      value: false
    }, // 数据请求
    showTipImage: {
      type: Boolean,
      value: false
    }, // 是否出现提示块
    tipTitle: {
      type: String,
      value: ''
    },// 提示块内的标题文字
    tipSubtitle: {
      type: String,
      value: ''
    },// 提示块内的副标题文字
    select: {
      type: Boolean,
      value: false
    }, // 是否开启勾选
    selectKey: {
      type: Array,
      value: []
    }, // 勾选的初始rowKey列表
  },

  computed: {
    showDataList(data: InitData & WechatMiniprogram.Component.PropertyOptionToData<InitProperty>) {
      const needReaderColums = data.columns.filter(item => item.render)
      return data.dataList.map((item, index) => {
        let newItem = { ...item }
        needReaderColums.forEach((item1) => {
          newItem[item1.key] = item1.render(newItem[item1.key], item, index, getNowPage().data)
        })
        return newItem
      })
    }
  },
  watch: {
    'dataList': function (dataList: any[]) {
      if (dataList && dataList.length > 0) {
        return
      } else {
        this.setScrollTop()
      }
    },
    // selectKey用于初始化勾选 每次改变都会更新勾选
    'selectKey': function (selectKey: any[]) {
      const newCheckObj: { [key: string]: boolean } = {}
      selectKey.forEach(item => {
        newCheckObj[item] = true
      })
      this.setData({
        checkObj: newCheckObj
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    scrollTop: 0,// 设置回到顶部
    checkObj: {},// 勾选的项的存储对象
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 设置当列表清空 滚回顶部
    setScrollTop() {
      this.setData({
        scrollTop: 0
      })
    },
    // 滚动到底部触发
    handleScrolltolower() {
      this.triggerEvent('scrolltolower')
    },
    // 滚动到顶部触发
    handleScrolltoupper() {
      this.triggerEvent('scrolltoupper')
    },
    // 点击表格中一项触发
    handleClickListItem(e) {
      const { index } = e.currentTarget.dataset
      this.triggerEvent('clicklistitem', {
        value: {
          index,
          item: e.currentTarget.dataset.item
        }
      })
    },
    // 如果有action 里面有点击事件 怎触发该事件
    handleClickActionBtn(e) {
      this.triggerEvent('clickaction', {
        value: e.detail.value
      })
    },
    // 勾选事件 
    // 只记录勾选的rowKey 因为index和item在初始化的时候是无法获取的
    handleClickCheck(e) {
      const { item } = e.currentTarget.dataset
      const { checkObj, rowKey } = this.data
      const newCheckObj = { ...checkObj }
      newCheckObj[item[rowKey]] = !newCheckObj[item[rowKey]]
      this.setData({
        checkObj: newCheckObj
      }, () => {
        const value = []
        for (let i in newCheckObj) {
          if (newCheckObj[i]) {
            value.push(i)
          }
        }
        this.triggerEvent('checkkey', {
          value
        })
      })
    }
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      const { rowKey, columns } = this.data
      if (!rowKey) {
        console.error('table组件必须指明每一行的唯一标识的字段名，且必须为字符串，数字将会被转为字符串')
      }
      if (!columns) {
        console.error('table组件必须指明columns')
      }

    },
    moved: function () { },
    detached: function () { },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

})

export { }