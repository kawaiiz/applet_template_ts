Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        keyType: {
            type: String,
            value: 'zh',
        },
        show: {
            type: Boolean,
            value: false,
        }
    },
    data: {
        cityKeyword1: '京沪浙苏粤鲁晋冀豫',
        cityKeyword2: '川渝辽吉黑皖鄂湘赣',
        cityKeyword3: '闽陕甘宁蒙津贵云',
        cityKeyword4: '桂琼青新藏港澳台',
        keyNumber: '1234567890',
        wordList1: 'QWERTYUIOP',
        wordList2: 'ASDFGHJKL',
        wordList3: 'ZXCVBNM',
    },
    methods: {
        handleClick(e) {
            let value = e.currentTarget.dataset.item;
            let type = e.currentTarget.dataset.type;
            switch (value) {
                case 'delete':
                    this.triggerEvent('delete');
                    break;
                case 'close':
                    this.triggerEvent('close');
                    break;
                default:
                    this.triggerEvent('clickitem', { value: { value, type: type === 1 ? 'zh' : 'en' } });
            }
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
