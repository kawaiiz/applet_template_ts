const computedBehavior = require('miniprogram-computed');
import { getNowPage } from '../../../utils/util';
Component({
    behaviors: [computedBehavior],
    options: {
        addGlobalClass: true,
    },
    properties: {
        rowKey: {
            type: String,
            value: 'id'
        },
        scrollViewHeight: {
            type: String,
            value: '200rpx'
        },
        columns: {
            type: Array,
            value: []
        },
        dataList: {
            type: Array,
            value: []
        },
        getListLoading: {
            type: Boolean,
            value: false
        },
        showTipImage: {
            type: Boolean,
            value: false
        },
        tipTitle: {
            type: String,
            value: '提示'
        },
        tipSubtitle: {
            type: String,
            value: '暂无数据'
        },
        select: {
            type: Boolean,
            value: false
        },
        selectKey: {
            type: Array,
            value: []
        },
    },
    computed: {
        showDataList(data) {
            const { columns, dataList, rowKey } = data;
            const needReaderColums = columns.filter(item => item.render);
            return dataList.map((item, index) => {
                let newItem = Object.assign(Object.assign({}, item), { row_key: `${item[rowKey]}` });
                needReaderColums.forEach((item1) => {
                    newItem[item1.key] = item1.render(newItem[item1.key], item, index, getNowPage().data);
                });
                return newItem;
            });
        }
    },
    watch: {
        'dataList': function (dataList) {
            if (dataList && dataList.length > 0) {
                return;
            }
            else {
                this.setScrollTop();
            }
        },
        'selectKey': function (selectKey) {
            const newCheckObj = {};
            selectKey.forEach(item => {
                newCheckObj[item] = true;
            });
            this.setData({
                checkObj: newCheckObj
            });
        }
    },
    data: {
        scrollTop: 0,
        checkObj: {},
    },
    methods: {
        setScrollTop() {
            this.setData({
                scrollTop: 0
            });
        },
        handleScrolltolower() {
            this.triggerEvent('scrolltolower');
        },
        handleScrolltoupper() {
            this.triggerEvent('scrolltoupper');
        },
        handleClickListItem(e) {
            const { index } = e.currentTarget.dataset;
            this.triggerEvent('clicklistitem', {
                value: {
                    index,
                    item: e.currentTarget.dataset.item
                }
            });
        },
        handleClickActionBtn(e) {
            this.triggerEvent('clickaction', {
                value: e.detail.value
            });
        },
        handleClickCheck(e) {
            const { item } = e.currentTarget.dataset;
            const { checkObj, rowKey } = this.data;
            const newCheckObj = Object.assign({}, checkObj);
            newCheckObj[item[rowKey]] = !newCheckObj[item[rowKey]];
            this.setData({
                checkObj: newCheckObj
            }, () => {
                const value = [];
                for (let i in newCheckObj) {
                    if (newCheckObj[i]) {
                        value.push(i);
                    }
                }
                this.triggerEvent('checkkey', {
                    value
                });
            });
        }
    },
    lifetimes: {
        attached: function () {
            const { rowKey, columns } = this.data;
            if (!rowKey) {
                console.error('table组件必须指明每一行的唯一标识的字段名，且必须为字符串，数字将会被转为字符串,for循环中的wx:key不使用该字段，用的是computed中设置的row_key字段');
            }
            if (!columns) {
                console.error('table组件必须指明columns');
            }
        },
        moved: function () { },
        detached: function () { },
    },
    pageLifetimes: {
        show: function () { },
        hide: function () { },
        resize: function () { },
    },
});
