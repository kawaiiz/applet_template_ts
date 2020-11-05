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
            value: ''
        },
        label: {
            type: String,
            value: ''
        },
        value: {
            type: String,
            value: undefined
        },
        type: {
            type: String,
            value: 'text'
        },
        fixed: {
            type: Boolean,
            value: false
        },
        border: {
            type: Boolean,
            value: true
        },
        disabled: {
            type: Boolean,
            value: false
        },
        clearable: {
            type: Boolean,
            value: false
        },
        password: {
            type: Boolean,
            value: false
        },
        titleWidth: {
            type: String,
            value: '180rpx'
        },
        maxlength: {
            type: Number,
            value: -1
        },
        placeholder: {
            type: String,
            value: ''
        },
        placeholderStyle: {
            type: String,
            value: ''
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
            value: ''
        },
        inputAlign: {
            type: String,
            value: 'left'
        },
        confirmType: {
            type: String,
            value: '确定'
        },
        cursorSpacing: {
            type: Number,
            value: 50
        },
        autoFocus: {
            type: Boolean,
            value: false
        },
    },
    data: {
        IMAGEURL: app.globalData.IMAGEURL,
    },
    methods: {
        handleInput(e) {
            this.triggerEvent('input', {
                value: e.detail
            });
        },
        handleChange(e) {
            this.triggerEvent('change', {
                value: e.detail
            });
        },
        handleClickClear(_e) {
            this.triggerEvent('clear');
        }
    },
    lifetimes: {
        attached: function () { },
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
