import { Image,List,InfiniteScroll} from "antd-mobile";
import { useState,useEffect} from "react";
import { ListRes , fetchListAPI} from "../../../apis/list.ts";
import {useNavigate} from "react-router-dom"

type Props = {
  channelId: string;
}
const HomeList = (props : Props) => {
  const [listRes, setListRes] = useState<ListRes>({
    results: [],
    pre_timestamp: ''+ new Date().getTime()
  });
  const {channelId} = props;
  useEffect(() => {
    const getList=async()=>{
      try{
        const res=await fetchListAPI({
          channel_id: channelId,
          timestamp:'' + new Date().getTime()
        })
        setListRes({
          results: res.data.data.results,
          pre_timestamp:res.data.data.pre_timestamp,
        })
      }
        catch(e){
          throw new Error("fetch list error")
        }
    }
    getList()
  }, [channelId])

  const [hasMore, setHasMore] = useState(true)
  const loadMore = async () => {
     try{
        const res=await fetchListAPI({
          channel_id: channelId,
          timestamp: listRes.pre_timestamp
        })
        setListRes({
          results: [...listRes.results, ...res.data.data.results],
          pre_timestamp:res.data.data.pre_timestamp,
        })
        if(res.data.data.results.length===0){
          setHasMore(false)
      }
    }
        catch(e){
          throw new Error("fetch list error")
        }

  }
  const navigate = useNavigate()
  const goToDetail = (props : string) => {
    navigate(`/details?id=${props}`)
  }
  return (
    <>
    <List>
      {listRes.results.map((item) => (
      <List.Item key={item.art_id}
       onClick={()=>goToDetail(item.art_id)}
       prefix={<Image src={item.cover.images?.[0]} 
       style={{borderRadius:20}}
       fit='cover'
        width={40}
        height={40}
       />}
      description={item.pubdate}>
      {item.title}
      </List.Item>
      ))}
    </List>
     <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}
export default HomeList