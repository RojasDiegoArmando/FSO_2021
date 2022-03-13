import React, { useState, useEffect, useRef } from 'react'
import Logged from './components/Logged'
import LogoutForm from './components/LogoutForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notifications'

const App = () => {
    let [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const [timmer, setTimmer] = useState('')
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
        const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
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
            clearTimeout(timmer)
            setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
            setMessageType('add')
            setTimmer(setTimeout(() => {
                setMessage('')
                setMessageType('')
            }, 5000))
            blogRef.current.toggleVisibility()
        } catch (error) {
            clearTimeout(timmer)
            setMessage(`error: ${error.response.data.error}`)
            setMessageType('error')
            setTimmer(setTimeout(() => {
                setMessage('')
                setMessageType('')
            }, 5000))
        }
    }

    const modifyBlog = async (newBlog, id) => {
        try {
            await blogService.put(newBlog, id)
            const newBlogs = blogs.map(blog => blog.title === newBlog.title ? { ...blog, likes: blog.likes + 1 } : blog)
            setBlogs(newBlogs)
            clearTimeout(timmer)
            setMessage(`Like added to ${newBlog.title}`)
            setMessageType('add')
            setTimmer(setTimeout(() => {
                setMessage('')
                setMessageType('')
            }, 5000))
        } catch (error) {
            clearTimeout(timmer)
            setMessage(`error: ${error.response.data.error}`)
            setMessageType('error')
            setTimmer(setTimeout(() => {
                setMessage('')
                setMessageType('')
            }, 5000))
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
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
        } catch (error) {
            clearTimeout(timmer)
            setUser(null)
            setMessage(error.response.data.error)
            setMessageType('error')
            setTimmer(setTimeout(() => {
                setMessage('')
                setMessageType('')
            }, 5000))
        }
    }

    const handleDelete = async (blogToDelete) => {
        try {
            await blogService.deleteBlog(blogToDelete.id)
            console.log(blogToDelete)
            const newBlogs = blogs.filter(blog => blog.title !== blogToDelete.title)
            setBlogs(newBlogs)
            clearTimeout(timmer)
            setMessage(`${blogToDelete.title} deleted!`)
            setMessageType('add')
            setMessageType('error')
            setTimmer(setTimeout(() => {
                setMessage('')
                setMessageType('')
            }, 5000))
        } catch (error) {
            clearTimeout(timmer)
            setMessage(`error: ${error.response.data.error}`)
            setMessageType('error')
            setMessageType('error')
            setTimmer(setTimeout(() => {
                setMessage('')
                setMessageType('')
            }, 5000))
        }
    }
    return (
        <div>
            <h2>blogs-app</h2>

            <Notification message={message} type={messageType} />
            {user !== null && <LogoutForm name={user.name} handleLogout={handleLogout} />}
            <br />
            {
                user === null
                    ? <LoginForm handleLogin={handleLogin} />
                    : <Logged blogs={blogs} toggableRef={blogRef} createNewBlog={createNewBlog} modifyBlog={modifyBlog} deleteBlog={handleDelete} />
            }
        </div>
    )
}

export default App