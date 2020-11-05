var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { throttle } from 'lodash';
Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        index: {
            type: Number
        },
        maxIndex: {
            type: Number
        }
    },
    relations: {
        '../drag_list/drag_list': {
            type: 'parent',
            linked() {
            },
            linkChanged() {
            },
            unlinked() {
            }
        }
    },
    lifetimes: {
        ready() {
            this.initData();
        }
    },
    data: {
        itemInfo: {},
        scale: 1,
        translateX: 0,
        translateY: 0,
        isSuccessAction: false,
        isActive: false,
        start: {
            x: 0,
            y: 0
        }
    },
    methods: {
        initData() {
            const query = this.createSelectorQuery();
            const className = '.drag-item';
            query.select(className).boundingClientRect((res) => {
                this.setData({
                    itemInfo: {
                        top: res.top,
                        left: res.left,
                        right: res.right,
                        bottom: res.bottom,
                        height: res.height
                    }
                });
            }).exec();
        },
        handleLongpressItem(e) {
            wx.vibrateShort();
            this.setData({
                isActive: true,
                scale: 1.1,
                start: {
                    x: e.touches[0].pageX,
                    y: e.touches[0].pageY
                }
            });
        },
        handleTouchmove: throttle(function (e) {
            return __awaiter(this, void 0, void 0, function* () {
                const { isActive, start } = this.data;
                if (!isActive)
                    return;
                console.log(e);
                const { pageY } = e.touches[0];
                this.setData({
                    translateY: pageY - start.y
                });
            });
        }, 300, {
            leading: false,
            trailing: true
        }),
        handleTouchend(_e) {
            this.setData({
                isActive: false,
                scale: 1,
            }, this.emitParentEvent);
        },
        emitParentEvent() {
            const parentComponent = this.getRelationNodes('../drag_list/drag_list');
            const { index, translateY, itemInfo, maxIndex } = this.data;
            if (!((Math.abs(translateY) < itemInfo.height / 2) ||
                (translateY < 0 && index === 0) ||
                (translateY > 0 && index === maxIndex))) {
                parentComponent[0].handleItemChange({ index, translateY });
            }
            this.setData({
                translateY: 0
            });
        }
    }
});
