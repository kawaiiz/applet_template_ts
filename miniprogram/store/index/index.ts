const { observable } = require('mobx-miniprogram')
import globalData from '../globalData/globalData'
import other from '../other/other'
import { GlobalDataStore, GlobalDataAction } from '../globalData/data'
import { OtherAction, OtherStore } from '../other/data'
export default observable({
  ...globalData,
  ...other
}) as GlobalDataStore & GlobalDataAction & OtherAction & OtherStore