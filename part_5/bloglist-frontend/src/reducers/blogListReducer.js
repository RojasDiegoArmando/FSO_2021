import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const blogListReducer = createSlice({
    name: 'blogList',
    initialState: [],
    reducers: {
        setBlogList(state, action) {
            state = action.payload
            return state
        },
        appendBlog(state, action) {
            console.log(action.payload)
            console.log(state)
            state = state.concat(action.payload)
            console.log(state)
            return state
        },
        updateBlog(state, action) {
            const id = action.payload.id
            return state.map((blog) => (blog.id !== id ? blog : action.payload))
        },
        deleteBlog(state, action) {
            const id = action.payload
            state = state.filter((blog) => blog.id !== id)
            return state
        },
    },
})

export const { setBlogList, appendBlog, updateBlog, deleteBlog } =
    blogListReducer.actions

export const initializeBlogList = () => {
    return async (dispatch) => {
        const blogList = await blogServices.getAll()
        const sortedBlogs = blogList.sort((a, b) => b.likes - a.likes)
        dispatch(setBlogList(sortedBlogs))
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogServices.create(blog)
        console.log(newBlog)
        dispatch(appendBlog(newBlog))
    }
}

export const modifyBlog = (object, id) => {
    return async (dispatch) => {
        const modifiedBlog = await blogServices.put(object, id)
        dispatch(updateBlog(modifiedBlog))
    }
}

export const addComment = (object, id) => {
    return async (dispatch) => {
        const modifiedBlog = await blogServices.putComment(object, id)
        console.log(modifiedBlog)
        dispatch(updateBlog(modifiedBlog))
    }
}

export const deleteBlogFromList = ({ id }) => {
    return async (dispatch) => {
        const deletedBlog = await blogServices.deleteBlog(id)
        dispatch(deleteBlog(id))
    }
}

export default blogListReducer.reducer
