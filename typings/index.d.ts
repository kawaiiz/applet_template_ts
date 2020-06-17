/// <reference path="./types/index.d.ts" />
/// <reference path="./types/global.d.ts" />
/// <reference path="./types/store.d.ts" />

interface IAppOption {
  setNavStyle: () => void,
  watchUserInfo: () => void,
  watchUserInfoFn: (method: Function) => void,
  watchStore: () => void,
  watchStoreFn: (method: Function) => void,
  globalData: GlobalData.GlobalData
}
