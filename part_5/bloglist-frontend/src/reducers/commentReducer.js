import { createSlice } from '@reduxjs/toolkit'

const commentReducer = createSlice({
    name: 'comments',
    value: [],
    reducers: {
        setComments(state, action) {
            state = action.payload
            return state
        },
    },
})

export default commentReducer.reducer
