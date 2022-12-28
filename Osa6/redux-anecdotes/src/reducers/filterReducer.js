import { createSlice } from '@reduxjs/toolkit'

const initialState = ''


const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateSearch(state, action) {
      const search = action.payload
      return search
    }
  },


})

export const { updateSearch } = filterSlice.actions
export default filterSlice.reducer