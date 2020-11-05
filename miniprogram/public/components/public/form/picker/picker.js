const app = getApp();
Component({
    options: {
        addGlobalClass: true,
        multipleSlots: true
    },
    properties: {
        required: {
            type: Boolean,
            value: false
        },
        key: {
            type: String,
            value: undefined
        },
        label: {
            type: String,
            value: 'picker标题'
        },
        value: {
            type: Object,
            value: undefined
        },
        mode: {
            type: String,
            value: 'selector'
        },
        border: {
            type: Boolean,
            value: true
        },
        disabled: {
            type: Boolean,
            value: true
        },
        titleWidth: {
            type: String,
            value: '180rpx'
        },
        inputAlign: {
            type: String,
            value: 'left'
        },
        range: {
            type: Array,
            value: undefined
        },
        rangeKey: {
            type: String,
            value: undefined
        },
        placeholder: {
            type: String,
            value: '请选择'
        },
        start: {
            type: String,
            value: undefined
        },
        end: {
            type: String,
            value: undefined
        },
        fields: {
            type: String,
            value: undefined
        },
        error: {
            type: Boolean,
            value: false
        },
        errorMessage: {
            type: String,
            value: ''
        },
        errorMessageAlign: {
            type: String,
            value: 'left'
        },
    },
    data: {
        IMAGEURL: app.globalData.IMAGEURL,
        pickerValue: null
    },
    methods: {
        handleChangePicker(e) {
            const { value } = e.detail;
            const { range, mode } = this.data;
            let pickerValue = null;
            if (mode === 'selector') {
                pickerValue = range[value];
            }
            else if (mode === 'multiSelector') {
                pickerValue = value.map((item, index) => {
                    return range[index][item];
                });
            }
            else if (mode === 'time') {
                pickerValue = value;
            }
            else if (mode === 'date') {
                pickerValue = value;
            }
            else if (mode === 'region') {
                pickerValue = value;
            }
            this.setData({
                pickerValue
            });
            this.emitEventChange(value);
        },
        emitEventChange(value) {
            this.triggerEvent('change', {
                value
            });
        },
        tipFc() {
            const { mode, range } = this.data;
            if ((mode === 'selector' || mode === 'multiSelector') && !range) {
                console.error('普通选择模式、多选模式mode字段必填');
            }
        }
    },
    lifetimes: {
        attached: function () { },
        ready: function () { },
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
