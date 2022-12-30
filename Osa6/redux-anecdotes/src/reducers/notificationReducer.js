import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
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

let timeout = null

export const setNotification = (message, secondsVisible) => {
  return dispatch => {
    if(timeout) { clearTimeout(timeout) }
    dispatch(showNotification(message))
    
    timeout = setTimeout(() => {
        dispatch(hideNotification())
    }, secondsVisible * 1000)
  }
}

export default notificationSlice.reducer