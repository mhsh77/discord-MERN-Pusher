import React ,{useState} from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RedeemIcon from '@mui/icons-material/Redeem';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { selectChannelId } from '../redux/controllers/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../redux/actions/channelactions';

function ChatInput() {
  const [message,setmessage] = useState('')
  const id = useSelector(selectChannelId)
  const dispatch = useDispatch()
  return (
    <form className='px-3 m-2 bg-slate-500 flex text-white text-lg space-x-3 py-2 items-center' onSubmit={(e)=>{
      e.preventDefault()
      //console.log(message)
      dispatch(sendMessage(message,id))
      setmessage('')
    }}>
        <AddCircleIcon fontSize='large'/>
        <input type="text" placeholder='Message #youtube' className='flex-1 bg-transparent focus:outline-none' value={message} onChange={(e)=>{setmessage(e.target.value)}}/>
        <RedeemIcon fontSize='large'/>
        <GifIcon sx={{fontSize:40}}/>
        <EmojiEmotionsIcon fontSize='large'/>
        
    </form>
  )
}

export default ChatInput