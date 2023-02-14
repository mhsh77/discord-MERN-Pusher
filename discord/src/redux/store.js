import { configureStore } from '@reduxjs/toolkit'
import userReducer from './controllers/userSlice'
import appReducer from './controllers/appSlice'
import errorAndLoadingReducer from './controllers/errorAndLoadingSlice'
export const store = configureStore({
  reducer: {
    user:userReducer,
    app:appReducer,
    errorAndLoading:errorAndLoadingReducer
  },
})