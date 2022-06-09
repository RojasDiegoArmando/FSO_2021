import { createSlice } from '@reduxjs/toolkit'
import { setTimer, clearTimer } from './timerReducer'

const notificationReducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            state = action.payload
            return state
        },
        removeNotification(state, _action) {
            state = ''
            return state
        },
    },
})

export const { createNotification, removeNotification } =
    notificationReducer.actions
export const setNotification = (object, time) => {
    return (dispatch) => {
        dispatch(createNotification(object))
        dispatch(clearTimer())
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
