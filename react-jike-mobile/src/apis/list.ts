import { http } from "../utils"
import { ResType } from "./shared"

export type ChannelItem={
  id : number,
  name : string,
}

type ChannelRes= {
  channels: ChannelItem[]
}

export function fetchChannelAPI(){
  return http.request<ResType<ChannelRes>>({
    url:'/channels',
})}

type ListItems={
  art_id: string,
  title: string,
  aut_id: string,
  comm_count: number,
  pubdate: string,
  aut_name: string,
  is_top: number,
  cover:{
    type: number,
    images: string[]
  }}
  export type ListRes={
    results: ListItems[]
    pre_timestamp: string
  }

  export type reqparams={
    channel_id: string,
    timestamp: string
  }

  export function fetchListAPI(params : reqparams){
  return http.request<ResType<ListRes>>({
    url:'/articles',
    params,
})}