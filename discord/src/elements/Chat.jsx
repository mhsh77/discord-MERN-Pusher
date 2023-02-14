import React, { useEffect } from 'react'

import ChatHeader from './ChatHeader';
import ChatMasseges from './ChatMasseges';
import ChatInput from './ChatInput';
import { useDispatch, useSelector } from 'react-redux';
import {getchannelList, getchats} from '../redux/actions/channelactions'
import { selectChannelId } from '../redux/controllers/appSlice';
function Chat() {
  const dispatch = useDispatch()
  const id = useSelector(selectChannelId)
 
  return (
    <div className='flex-1 bg-[#414249] flex flex-col'>
        <ChatHeader/>
        <ChatMasseges/>
        <ChatInput/>
    </div>
  )
}

export default Chat