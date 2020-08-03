
declare namespace WechatMiniprogram {
  namespace Component {
    interface OtherOption {
      storeBindings: any,
      computed: {
        [key: string]: (...data: any[]) => any
      },
      watch: any
    }
  }
}