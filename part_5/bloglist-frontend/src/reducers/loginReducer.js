import { createSlice } from '@reduxjs/toolkit'
import loginServices from '../services/login'
import blogService from '../services/blogs'
const loginReducer = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        setUser(state, action) {
            state = action.payload
            return state
        },
        blankUser(state, login) {
            state = null
            return state
        },
    },
})

export const { setUser, blankUser } = loginReducer.actions

export const loginUser = (credentials) => {
    return async (dispatch) => {
        const response = await loginServices.login(credentials)
        window.localStorage.setItem(
            'loggedBloglistUser',
            JSON.stringify(response)
        )
        blogService.setToken(response.token)
        dispatch(setUser(response))
    }
}

export const CheckIfUserIsAlreadyLoggedIn = () => {
    return async (dispatch) => {
        const loggedBloglistUser =
            window.localStorage.getItem('loggedBloglistUser')
        if (loggedBloglistUser) {
            const user = JSON.parse(loggedBloglistUser)
            dispatch(setUser(user))
            blogService.setToken(user.token)
        } else {
            dispatch(blankUser())
        }
    }
}

export default loginReducer.reducer
