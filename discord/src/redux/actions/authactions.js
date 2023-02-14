import axios from "axios"
import { seterror, setloading } from "../controllers/errorAndLoadingSlice"
import { login } from "../controllers/userSlice"

axios.defaults.withCredentials = true
export const loginreq =(email,password)=> async (dispatch) => {
    

    const {data} = await axios.post('/api/login',{email,password})
    console.log(data);
    if(data.success){
        console.log(data.success);
        dispatch(login(data.user))
        
        
    }
}

export const registerreq =(username,email,password)=> async (dispatch) => {
    
    
    const {data} = await axios.post('/api/register',{username,email,password})
    
    
    if(data.success){
        dispatch(login(data.user))
        
    }
}