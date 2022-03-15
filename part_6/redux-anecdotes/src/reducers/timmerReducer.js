import { createSlice } from '@reduxjs/toolkit'

const timmerReducer = createSlice({
    name: 'timmer',
    initialState: '',
    reducers: {
        setTimmer(state, action) {
            return action.payload
        }
    }
})
export const { setTimmer } = timmerReducer.actions
export default timmerReducer.reducer