import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: null,
  loading:false
}

export const errorAndLoadingSlice = createSlice({
  name: 'errorAndLoading',
  initialState,
  reducers: {
    setloading:(state,action) => {
      state.loading = action.payload;
    },
    seterror:(state,action) => {
      state.loading = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setloading, seterror } = errorAndLoadingSlice.actions
export const selectloading = (state) => state.errorAndLoading.loading;
export const selecterror = (state) => state.errorAndLoading.error;
export default errorAndLoadingSlice.reducer