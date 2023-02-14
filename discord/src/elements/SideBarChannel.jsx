import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getchats } from '../redux/actions/channelactions'
import { setChannelId, setChannelName } from '../redux/controllers/appSlice'

function SideBarChannel({id,channelName}) {
  const dispatch = useDispatch()
  
  
  return (
    <div className='text-gray-500 border-b flex items-center justify-between p-5 border-gray-600 font-bold text-sm lg:text-lg hover:bg-gray-300 hover:rounded-lg hover:text-black' onClick={()=>{dispatch(setChannelName(channelName))
      dispatch(setChannelId(id))
      dispatch(getchats(id))
      console.log(id)}}>
        <h1>{channelName}</h1>
        <h1>#</h1>
    </div> 
  )
}

export default SideBarChannel