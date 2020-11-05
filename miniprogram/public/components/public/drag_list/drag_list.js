var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {},
    relations: {
        '../drag_item/drag_item': {
            type: 'child',
            linked(_target) {
                this._updateDataChange();
            },
            linkChanged() {
            },
            unlinked() {
            }
        }
    },
    data: {
        childInfo: [],
        timer: null
    },
    observers: {
        'childInfo.**': function (_childInfo) {
        }
    },
    methods: {
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
                    });
                }).exec();
            });
        },
        _updateDataChange() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.data.timer) {
                    clearTimeout(this.data.timer);
                    this.setData({
                        timer: null
                    });
                }
                const childComponent = this.getRelationNodes('../drag_item/drag_item');
                this.data.timer = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    const promiseAllList = [];
                    childComponent.forEach((item, _index) => {
                        promiseAllList.push(this.getChildInfo(item));
                    });
                    const res = yield Promise.all(promiseAllList);
                    this.setData({
                        childInfo: res
                    });
                }), 100);
                this.setData({
                    timer: this.data.timer
                });
            });
        },
        handleItemChange(data) {
            const { index, translateY } = data;
            const { childInfo } = this.data;
            let i;
            if (translateY > 0) {
                i = index + 1;
                for (i; i < childInfo.length; i++) {
                    if (this.compute(childInfo[index], childInfo[i], translateY, 'bottom')) {
                        this.triggerEvent('indexChange', { from: index, to: i });
                        return;
                    }
                }
                this.triggerEvent('indexChange', { from: index, to: childInfo.length - 1 });
            }
            else {
                i = index - 1;
                for (i; i >= 0; i--) {
                    if (this.compute(childInfo[index], childInfo[i], translateY, 'top')) {
                        this.triggerEvent('indexChange', { from: index, to: i });
                        return;
                    }
                }
                this.triggerEvent('indexChange', { from: index, to: 0 });
            }
        },
        compute(nowItem, target, translateY, type) {
            const Y = nowItem[type] + translateY;
            return Y > target.top && Y < target.bottom;
        }
    }
});
export {};
