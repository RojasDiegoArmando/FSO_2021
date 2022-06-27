import React, { useEffect, useRef } from 'react'
import BlogsForm from './components/BlogsForm'
import UsersView from './components/UsersView'
import { useDispatch } from 'react-redux'
import { CheckIfUserIsAlreadyLoggedIn } from './reducers/loginReducer'
import { initializeBlogList } from './reducers/blogListReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogsByUser from './components/BlogsByUser'
import BlogView from './components/BlogView'
import Notification from './components/Notifications'
import LogoutForm from './components/LogoutForm'
import LoginForm from './components/LoginForm'
import Navbar from './components/Navbar'

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
        <Router>
            <Navbar />
            <Notification />
            <h1>Blogs</h1>
            <LoginForm />
            <Routes>
                <Route path="/blogs/:id" element={<BlogView />} />
                <Route path="/users/:id" element={<BlogsByUser />} />
                <Route path="/users" element={<UsersView />} />
                <Route path="/" element={<BlogsForm toggableRef={blogRef} />} />
            </Routes>
        </Router>
    )
}

export default App
