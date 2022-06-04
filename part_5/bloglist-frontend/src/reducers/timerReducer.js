import { createSlice } from '@reduxjs/toolkit'

const timerReducer = createSlice({
    name: 'timer',
    initialState: '',
    reducers: {
        setTimer(state, action) {
            return action.payload
        },
    },
})

export const { setTimer } = timerReducer.actions
export default timerReducer.reducer
