import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/index.tsx'
import { fetchChannelAPI } from './apis/list.ts'
fetchChannelAPI().then((res)=>{
    console.log(res.data.data.channels)
}
)
createRoot(document.getElementById('root')!).render(
    <RouterProvider router = {routes}/>
)
