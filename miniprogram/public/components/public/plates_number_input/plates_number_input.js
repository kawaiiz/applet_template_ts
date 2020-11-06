const computedBehavior = require('miniprogram-computed');
Component({
    behaviors: [computedBehavior],
    options: {
        addGlobalClass: true,
    },
    properties: {
        initData: {
            type: Array,
            value: new Array(8).fill(undefined)
        },
        initTypewritingShow: {
            type: Object,
            value: {
                value: false
            }
        }
    },
    data: {
        inputValue: new Array(8).fill(undefined),
        currentIndex: -1,
        typewritingShow: false
    },
    watch: {
        'initData': function (initData) {
            const newInputValue = initData.length === 8 ? initData : new Array(8).fill(undefined).map((_item, index) => {
                if (initData[index])
                    return initData[index];
                else
                    return undefined;
            });
            this.setData({
                inputValue: newInputValue
            });
        },
        'initTypewritingShow': function (initTypewritingShow) {
            this.setData({
                currentIndex: initTypewritingShow && initTypewritingShow.value ? 0 : -1
            });
        },
    },
    computed: {
        typewritingShow(data) {
            return data.currentIndex !== -1;
        },
        keyType(data) {
            return data.currentIndex === 0 ? 'zh' : 'en';
        },
    },
    methods: {
        catchTap() { },
        handleChangeCurrentIndex(e) {
            this.setData({
                currentIndex: e.detail.value
            });
        },
        handleClickTypewritingKey(e) {
            const { value } = e.detail;
            const { currentIndex, inputValue } = this.data;
            const key = `inputValue[${currentIndex}]`;
            this.setData({
                [key]: value.value,
                currentIndex: currentIndex < inputValue.length - 1 ? currentIndex + 1 : currentIndex
            }, () => {
                this.triggerEventValue();
            });
        },
        handleClickTypewritingDel(_e) {
            const { currentIndex } = this.data;
            const key = `inputValue[${currentIndex}]`;
            this.setData({
                [key]: null
            }, () => {
                this.triggerEventValue();
            });
        },
        triggerEventValue() {
            const { inputValue } = this.data;
            const value = inputValue.reduce((total, item) => total + (item || ' '), '') || '';
            this.triggerEvent('changeplatesnumber', {
                value: {
                    value,
                    valueArr: inputValue
                }
            });
        },
        handleClickTypewritingClose(_e) {
            this.setData({
                currentIndex: -1
            });
        },
        initComponent() {
            const { initData, initTypewritingShow } = this.data;
            this.setData({
                inputValue: initData,
                typewritingShow: initTypewritingShow ? initTypewritingShow.value : false
            });
        }
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
            this.initComponent();
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
export {};
