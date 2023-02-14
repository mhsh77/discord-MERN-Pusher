import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channelName: null,
  channelId: null,
  channelsList:[],
  channelChats:[]
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setChannelId:(state,action) => {
      state.channelId = action.payload;
    },
    setChannelsList:(state,action)=>{
      state.channelsList = action.payload;
    },
    setChannelName:(state,action) => {
      state.channelName = action.payload;
    },
    setChannelChats:(state,action)=>{
      state.channelChats = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setChannelId, setChannelName,setChannelsList,setChannelChats } = appSlice.actions
export const selectChannelId = (state) => state.app.channelId;
export const selectChannelName = (state) => state.app.channelName;
export const channelList = (state) => state.app.channelsList;
export const selectchannelChats = (state) => state.app.channelChats;
export default appSlice.reducer