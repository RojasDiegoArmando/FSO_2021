import React, { useState, useEffect, useRef } from 'react'
import Logged from './components/Logged'
import LogoutForm from './components/LogoutForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import {
    createNotification,
    removeNotification,
} from './reducers/notificationReducer'
import { setTimer } from './reducers/timerReducer'
import {
    initializeBlogList,
    setBlogList,
    createBlog,
    updateVote,
    deleteBlogFromList,
} from './reducers/blogListReducer'

const App = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    //let [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const blogRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogList())
        /*
        const fetchedBlogs = async () => {
            const blogs = await blogService.getAll()
            const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)
            return blogs
        }
        fetchedBlogs()
        */
    }, [])

    useEffect(() => {
        const loggedBloglistUser =
            window.localStorage.getItem('loggedBloglistUser')
        if (loggedBloglistUser) {
            const user = JSON.parse(loggedBloglistUser)
            setUser(user)
            blogService.setToken(user.token)
        } else {
            setUser(null)
        }
    }, [])

    const createNewBlog = async (newBlog) => {
        try {
            console.log(state.blogList)
            dispatch(createBlog(newBlog))
            console.log(state.blogList)
            dispatch(
                createNotification({
                    message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
                    type: 'add',
                })
            )
            setTimer(
                setTimeout(() => {
                    dispatch(removeNotification())
                }, 5000)
            )
            blogRef.current.toggleVisibility()
        } catch (error) {
            dispatch(
                createNotification({
                    message: `error: ${error}`,
                    type: 'error',
                })
            )
            setTimer(
                setTimeout(() => {
                    dispatch(removeNotification())
                }, 5000)
            )
        }
    }

    const modifyBlog = async (newBlog, id) => {
        //const state = useSelector((state) => state)
        try {
            //await blogService.put(newBlog, id)
            console.log(newBlog)
            dispatch(updateVote(newBlog, id))
            dispatch(
                createNotification({
                    message: `Like added to ${newBlog.title}`,
                    type: 'add',
                })
            )
            setTimer(
                setTimeout(() => {
                    dispatch(removeNotification())
                }, 5000)
            )
        } catch (error) {
            dispatch(
                createNotification({
                    message: `error: ${error}`,
                    type: 'error',
                })
            )
            setTimer(
                setTimeout(() => {
                    dispatch(removeNotification())
                }, 5000)
            )
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        setUser(null)
        blogService.setToken('')
    }

    const handleLogin = async (userObj) => {
        try {
            const user = await loginService.login(userObj)
            window.localStorage.setItem(
                'loggedBloglistUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
        } catch (error) {
            setUser(null)
            dispatch(
                createNotification({
                    message: `error: ${error.response.data.error}`,
                    type: 'error',
                })
            )
            setTimer(
                setTimeout(() => {
                    dispatch(removeNotification())
                }, 5000)
            )
        }
    }

    const handleDelete = async (blogToDelete) => {
        try {
            /*
            await blogService.deleteBlog(blogToDelete.id)
            //console.log(blogToDelete)
            const newBlogs = blogs.filter(
                (blog) => blog.title !== blogToDelete.title
            )
            */
            console.log(state.blogList)
            dispatch(deleteBlogFromList(blogToDelete))
            console.log(state.blogList)
            //setBlogs(newBlogs)
            dispatch(
                createNotification({
                    message: `${blogToDelete.title} deleted!`,
                    type: 'error',
                })
            )
            setTimer(
                setTimeout(() => {
                    dispatch(removeNotification())
                }, 5000)
            )
        } catch (error) {
            dispatch(
                createNotification({
                    message: `error: ${error.response.data.error}`,
                    type: 'error',
                })
            )
            setTimer(
                setTimeout(() => {
                    dispatch(removeNotification())
                }, 5000)
            )
        }
    }
    return (
        <div>
            <h2>blogs-app</h2>

            <Notification />
            {user !== null && (
                <LogoutForm name={user.name} handleLogout={handleLogout} />
            )}
            <br />
            {user === null ? (
                <LoginForm handleLogin={handleLogin} />
            ) : (
                <Logged
                    blogs={state.blogList}
                    toggableRef={blogRef}
                    createNewBlog={createNewBlog}
                    modifyBlog={modifyBlog}
                    deleteBlog={handleDelete}
                />
            )}
        </div>
    )
}

export default App
