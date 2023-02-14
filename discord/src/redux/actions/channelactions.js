import axios from "axios"
import { setChannelChats, setChannelsList } from "../controllers/appSlice"
import { seterror, setloading } from "../controllers/errorAndLoadingSlice"
import { login } from "../controllers/userSlice"

axios.defaults.withCredentials = true
export const getchannelList =()=> async (dispatch) => {
    

    const {data} = await axios.get('/api/channels')
    
    
    if(data.success){
        dispatch(setChannelsList(data.channels))
        
        
    }
}

export const getchats =(id)=> async (dispatch) => {
   
    const {data} = await axios.get(`/api/channel/${id}`)
    
    if(data.success){
        dispatch(setChannelChats(data.messages))
        
    }
}
export const getchat =(id)=> async (dispatch) => {
    
    const {data} = await axios.get(`/api/chat${id}`)
    
    if(data.success){
        dispatch(setChannelChats(data.messages))
        
    }
}

export const sendMessage =(content,channelId)=> async (dispatch) => {
    
    
    const {data} = await axios.post(`/api/newmessage`,{content,"channel":channelId})
    
}

export const newchannel =(name)=> async (dispatch) => {
    
    const {data} = await axios.post('/api/newchannel',{"name":name})
    
}