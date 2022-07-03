import { createSlice } from '@reduxjs/toolkit'

const timerReducer = createSlice({
    name: 'timer',
    initialState: '',
    reducers: {
        setTimer(state, action) {
            state = action.payload
            return state
        },
        clearTimer(state, action) {
            clearTimeout(state)
            state = ''
            return state
        },
    },
})

export const { setTimer, clearTimer } = timerReducer.actions
export default timerReducer.reducer
