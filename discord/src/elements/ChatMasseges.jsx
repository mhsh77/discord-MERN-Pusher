import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { getchat, getchats } from '../redux/actions/channelactions'
import { channelList, selectchannelChats, selectChannelId, setChannelChats } from '../redux/controllers/appSlice'
import Message from './Message'
import { seterror } from '../redux/controllers/errorAndLoadingSlice'
import Pusher from 'pusher-js';
function ChatMasseges() {
  const dispatch = useDispatch()
  const channelchats = useSelector(selectchannelChats)
  ///there is some problems with setting channel chats
  const id = useSelector(selectChannelId)
  const chats = useSelector(selectchannelChats)
  var pusher = new Pusher('bc335b0566864758a822', {
    cluster: 'ap2'
  });

  
  useEffect(()=>{
    
    if(id){dispatch(getchats(id))
     var channel = pusher.subscribe('message');
  channel.bind('newmessage', function(data) {

    dispatch(getchats(id))

  }); 
    
    }
   },[])
  
  return (
    <div className='overflow-auto flex flex-col flex-1'>
        {chats.map(chat=>(
          <Message chat={chat}/>
        ))}
        
    </div>
  )
}

export default ChatMasseges