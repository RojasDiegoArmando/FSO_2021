import { createSlice } from '@reduxjs/toolkit'

const timerReducer = createSlice({
    name: 'timer',
    initialState: '',
    reducers: {
        setTimer(state, action) {
            console.log(action.payload)
            state = action.payload
            return state
        },
        clearTimer(state, action) {
            console.log(state)
            clearTimeout(state)
            state = ''
            return state
        },
    },
})

export const { setTimer, clearTimer } = timerReducer.actions
export default timerReducer.reducer
