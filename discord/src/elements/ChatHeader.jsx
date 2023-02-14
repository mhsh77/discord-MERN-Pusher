import React, { useEffect } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import { selectChannelName } from '../redux/controllers/appSlice';
function ChatHeader() {
  const chat = useSelector(selectChannelName)
  
  
  return (
    <div className="chatheader flex w-full p-5 border-b border-gray-500 items-center justify-between">
            <div className='flex flex-row items-center'>
                <h1 className='text-gray-500 text-3xl font-bold pr-2'>#</h1>
                <h1 className='font-bold text-white'>{chat}</h1>
            </div>
           <div className='text-white space-x-2 flex flex-row'>
                <NotificationsIcon/>
                <FmdGoodIcon/>
                <PeopleIcon/>
                <div>
                    <input placeholder='Search' className='bg-gray-800 rounded-lg mr-[-25px] pl-2'/>
                    <SearchIcon className='text-gray-400'/>
                </div>
                
                <SendIcon/>
                <InfoIcon/>
            </div> 
        </div>
  )
}

export default ChatHeader