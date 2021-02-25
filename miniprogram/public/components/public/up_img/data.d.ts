import { UpFileResponse } from "../../../../store/globalData/data";

export interface ShowListItem {
  path: UpFileResponse | string,
  error: boolean,
}

export interface ValueListItem {
  path: UpFileResponse | string,
  [key: string]: any
}