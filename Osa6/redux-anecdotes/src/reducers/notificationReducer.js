import { createSlice } from '@reduxjs/toolkit'

const initialState = null


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
        const message = action.payload
        return message
    },
    hideNotification(state, action) {
        return null
    }
  },


})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer