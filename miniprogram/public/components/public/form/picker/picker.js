const computedBehavior = require('miniprogram-computed');
const app = getApp();
Component({
    behaviors: [computedBehavior],
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
            value: ''
        },
        numberValue: {
            type: Number,
            value: undefined
        },
        stringValue: {
            type: String,
            value: undefined
        },
        arrayValue: {
            type: Array,
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
            value: false
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
        _value: null,
        pickerShowData: null,
    },
    watch: {
        'numberValue': function (numberValue) {
            this.setValue();
        },
        'stringValue': function (stringValue) {
            this.setValue();
        },
        'arrayValue': function (arrayValue) {
            this.setValue();
        },
        'range': function (range) {
            this.setValue();
        }
    },
    methods: {
        setValue() {
            const { mode, numberValue, stringValue, arrayValue, range } = this.data;
            let value;
            if (mode === 'selector') {
                if (range.length === 0)
                    return;
                value = numberValue;
            }
            else if (mode === 'multiSelector') {
                if (range.length === 0)
                    return;
                value = arrayValue;
            }
            else if (mode === 'time') {
                value = stringValue;
            }
            else if (mode === 'date') {
                value = stringValue;
            }
            else if (mode === 'region') {
                if (range.length === 0)
                    return;
                value = arrayValue;
            }
            this.setData({
                _value: value,
                pickerShowData: this.createPickerShowData(value) || null
            });
        },
        createPickerShowData(value) {
            const { mode, range } = this.data;
            if (mode === 'selector') {
                return range[value];
            }
            else if (mode === 'multiSelector') {
                return value.map((item, index) => {
                    return range[index][item];
                });
            }
            else if (mode === 'time') {
                return value;
            }
            else if (mode === 'date') {
                return value;
            }
            else if (mode === 'region') {
                return value;
            }
        },
        handleChangePicker(e) {
            const { value } = e.detail;
            let pickerShowData = this.createPickerShowData(value);
            this.setData({
                _value: value,
                pickerShowData
            });
            this.emitEventChange(value);
        },
        emitEventChange(value) {
            this.triggerEvent('change', {
                value,
            });
        },
        tipFc() {
            const { mode, range } = this.data;
            if ((mode === 'selector' || mode === 'multiSelector') && !range) {
                console.error('range:普通选择模式、多选模式range字段必填');
            }
        }
    },
    lifetimes: {
        attached: function () { },
        ready: function () {
            this.tipFc();
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
