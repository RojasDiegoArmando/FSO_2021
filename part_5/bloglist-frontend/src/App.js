import React, { useState, useEffect, useRef } from 'react'
import BlogsForm from './components/BlogsForm'
import LogoutForm from './components/LogoutForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notifications'
import { useDispatch } from 'react-redux'
import { CheckIfUserIsAlreadyLoggedIn } from './reducers/loginReducer'
import { initializeBlogList } from './reducers/blogListReducer'

const App = () => {
    const dispatch = useDispatch()
    const blogRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogList())
    }, [])

    useEffect(() => {
        dispatch(CheckIfUserIsAlreadyLoggedIn())
    }, [])

    return (
        <div>
            <h2>blogs-app</h2>

            <Notification />
            <LogoutForm />
            <br />
            <LoginForm />
            <BlogsForm toggableRef={blogRef} />
        </div>
    )
}

export default App
