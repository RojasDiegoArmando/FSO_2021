import React, { useState, useEffect, useRef } from 'react'
import Logged from './components/Logged'
import LogoutForm from './components/LogoutForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notifications'
import { useDispatch } from 'react-redux'
import {
    createNotification,
    removeNotification,
} from './reducers/notificationReducer'
import { setTimer } from './reducers/timerReducer'

const App = () => {
    const dispatch = useDispatch()
    let [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const blogRef = useRef()

    useEffect(() => {
        const fetchedBlogs = async () => {
            const blogs = await blogService.getAll()
            const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)
            return blogs
        }

        fetchedBlogs()
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
            const blogAdded = await blogService.create(newBlog)
            console.log(blogAdded)
            const newBlogs = blogs.concat(blogAdded)
            setBlogs(newBlogs)
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

    const modifyBlog = async (newBlog, id) => {
        try {
            await blogService.put(newBlog, id)
            const newBlogs = blogs.map((blog) =>
                blog.title === newBlog.title
                    ? { ...blog, likes: blog.likes + 1 }
                    : blog
            )
            setBlogs(newBlogs)
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
            await blogService.deleteBlog(blogToDelete.id)
            console.log(blogToDelete)
            const newBlogs = blogs.filter(
                (blog) => blog.title !== blogToDelete.title
            )
            setBlogs(newBlogs)
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
                    blogs={blogs}
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
