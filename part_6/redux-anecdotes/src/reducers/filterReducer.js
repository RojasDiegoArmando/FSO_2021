import { createSlice } from '@reduxjs/toolkit'

const filterReducer = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        updateFilter(state, action) {
            return action.payload
        }
    }
})

export const { updateFilter } = filterReducer.actions
export default filterReducer.reducer