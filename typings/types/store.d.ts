declare namespace Store {

  interface UserInfo {
    truename: string,
    username: string,
    area: { id: number, name: string }[]
  }

  // 仓库总体
  interface Store {

  }
}