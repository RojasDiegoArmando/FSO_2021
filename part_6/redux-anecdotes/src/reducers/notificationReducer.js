import { createSlice } from '@reduxjs/toolkit'
import { setTimmer } from './timmerReducer'

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            clearTimeout(state.timmer)
            state = action.payload
            return state
        },
        removeNotification(state, action) {
            state = ''
            return state
        }
    }
})

export const { createNotification, removeNotification } = notificationReducer.actions
export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(createNotification(content))
        dispatch(setTimmer(setTimeout(() => {
            dispatch(removeNotification())
        }, time)))
    }
}
export default notificationReducer.reducer