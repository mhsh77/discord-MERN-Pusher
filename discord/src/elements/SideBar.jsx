import React, { useEffect,useState } from 'react'
import { ExpandMoreOutlined,Add } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import SettingsIcon from '@mui/icons-material/Settings';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SideBarChannel from './SideBarChannel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { selectUser } from '../redux/controllers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getchannelList, newchannel } from '../redux/actions/channelactions';
import { channelList, selectchannelChats, setChannelChats, setChannelsList } from '../redux/controllers/appSlice';
import {Modal,Button} from 'flowbite-react'
import Pusher from 'pusher-js';

function SideBar() {
  const user = useSelector(selectUser)
  
  const dispatch = useDispatch()
  const channellist= useSelector(channelList)
  const [channelname,setchannelname] = useState('')
  const [open,setopen] = useState(false)
  Pusher.logToConsole = true;
  
  useEffect(() => {
    dispatch(getchannelList())
    var pusher = new Pusher('bc335b0566864758a822', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('channel');
    channel.bind('newchannel', function(data) {
      console.log('new channel');
      dispatch(getchannelList())

    });

    
  }, []);
  return (
    <>
    <div className='bg-[#2f3135] md:w-1/4 w-2/5 flex flex-col justify-between'>
      <div className='flex flex-1 flex-col overflow-auto'>
        <div className='text-white flex items-center justify-between p-5 border-b-4 border-gray-500 font-bold md:text-2xl text-lg'>
              <h1>{user.username}</h1>
              <ExpandMoreOutlined/>
        </div>
        <button className='text-black flex items-center justify-between p-5 border-b-1 border-gray-500 font-light md:text-2xl text-lg bg-gray-500 w-full' onClick={(e)=>{
          e.preventDefault()
          setopen(true)
        }}>
            <h1>Create new channel</h1>
            <Add/>
        </button>
          <div className=' overflow-auto flex flex-col'>
          {channellist.map(channel=>(
            <div className='p-5 '>
              <SideBarChannel id={channel._id} channelName={channel.name}/>
            </div>
          ))}
          </div>
          
          
      </div>
      
      <div className=''>
        <div className='flex flex-row justify-between p-3 text-green-500 border-t border-gray-600'>
          <div className='flex flex-row items-center justify-center'>
            <SignalCellularAltIcon
            fontSize='large'/>
            <div className='flex flex-col justify-center'>
              <h1 className='font-bold md:text-xl text-lg pl-3'>Voice Connected</h1>
              <h2 className='font-light pl-3 text-gray-500  '>Stream</h2>
            </div>
            
          </div>
          
          <div className='flex flex-row items-center'>
            <InfoOutlinedIcon className='text-xl mr-3'/>
            <LocalPhoneIcon/>
          </div>
        </div>
        <div className='text-gray-500 border-t flex items-center justify-between p-3 border-gray-600 font-bold md:text-lg text-sm'>
          <div className='flex flex-row items-center'>
            <AccountCircleIcon fontSize='large' className='mr-3'/>
            <div>
              <h1 className='text-white'>{user.username}</h1>
              <h2 className='text-gray-500 font-light'>{user._id}</h2>
            </div>
          </div>
          
          
          <div className='gap-3'>
            <MicIcon className='text-xl mr-3'/>
            <SettingsIcon className='text-xl mr-3'/>
            <HeadphonesIcon className='text-xl'/>
          </div>
          
        </div> 
      </div>
        
        
    </div>
    <Modal show={open} onClose={()=>setopen(false)}>
    <Modal.Header>
      Create a new channel
    </Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        
          
        <h1>name:</h1>
        <input type="text" name="text"  className='w-full p-3 border-gray rounded-lg shadow-md mb-2 bg-slate-300 ' value={channelname} onChange={e => setchannelname(e.target.value)}/>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={()=>{setopen(false)
      dispatch(newchannel(channelname))
      }}>
        Submit
      </Button>
      
    </Modal.Footer>
  </Modal>  
  </>
  )
}

export default SideBar