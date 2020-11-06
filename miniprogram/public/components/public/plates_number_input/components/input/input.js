Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        inputValue: {
            type: Array,
            value: new Array(8).fill(undefined),
        },
        currentIndex: {
            type: Number,
            value: -1,
        }
    },
    data: {
        currentIndex: -1,
    },
    methods: {
        handleClickInput(e) {
            this.triggerEvent('changecurrentindex', {
                value: e.currentTarget.dataset.index
            });
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
