import { useState , useEffect} from 'react'
import{DetailDataData} from "../../apis/detail.ts"
import { fetchDetailAPI } from "../../apis/detail.ts"
import { useSearchParams } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Details = () => {
  const navigate = useNavigate() 
const back = () => {
  navigate(-1)

}
  const [detail,setDetail] = useState<DetailDataData|null>(null)
  const [searchParams] = useSearchParams()
  const params = searchParams.get('id')
  useEffect(() => {
    const getDetail=async()=>{
      try{
        const res=await fetchDetailAPI(params!)
        setDetail(res.data.data)
      }
        catch(e){
          throw new Error("fetch detail error")
        }
    }
    getDetail()
  }, [params])
  if(!detail){
    return <div>this is loading...</div>
  }
  return (
    <div className='tabContainer'>
      <NavBar onBack={back}>{detail?.title}</NavBar>
      <div dangerouslySetInnerHTML={{__html:detail?.content}}></div>
    </div>
  )
}

export default Details