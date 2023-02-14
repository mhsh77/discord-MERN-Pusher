import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { seterror, setloading } from '../redux/controllers/errorAndLoadingSlice'

function Message(chat) {
  console.log(chat)
  const [message,setmessage] = useState('')
  const [sender,setsender] = useState('')
  const [l,setl] = useState(true)
  const dispatch = useDispatch()
  
  return (
    <div className='flex flex-row items-center p-3'>
      
        <Avatar/>
        <div className='flex flex-col'>
            <div className='flex flex-row pl-3'>
                <h1 className='text-white font-bold'>{chat.chat.username}</h1>
                <span className='text-black pl-3'>timestamp</span>
                
            </div>
            <p className='text-white pl-3'>{chat.chat.messaage
}</p>
    
        </div>
      
        
        </div>
  )
}

export default Message