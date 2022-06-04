import { createSlice } from '@reduxjs/toolkit'
import { setTimer } from './timerReducer'

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            clearTimeout(state.timer)
            state = action.payload
            return state
        },
        removeNotification(state, _action) {
            clearTimeout(state.timer)
            state = ''
            return state
        },
    },
})

export const { createNotification, removeNotification } =
    notificationReducer.actions
export const setNotification = (content, time) => {
    return (dispatch) => {
        dispatch(createNotification(content))
        dispatch(
            setTimer(
                setTimeout(() => {
                    dispatch(removeNotification())
                }, time)
            )
        )
    }
}

export default notificationReducer.reducer
