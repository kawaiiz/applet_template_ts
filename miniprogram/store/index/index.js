const { observable } = require('mobx-miniprogram');
import globalData from '../globalData/globalData';
import other from '../other/other';
export default observable(Object.assign({}, globalData, other));
