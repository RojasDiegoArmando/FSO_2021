import React, { useState, useEffect, useRef } from 'react'
import Home from './components/Home'
import UsersView from './components/UsersView'
import { useDispatch } from 'react-redux'
import { CheckIfUserIsAlreadyLoggedIn } from './reducers/loginReducer'
import { initializeBlogList } from './reducers/blogListReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogsByUser from './components/BlogsByUser'

const App = () => {
    const dispatch = useDispatch()

    const style = {
        padding: 5,
    }

    useEffect(() => {
        dispatch(initializeBlogList())
    }, [])

    useEffect(() => {
        dispatch(CheckIfUserIsAlreadyLoggedIn())
    }, [])

    return (
        <Router>
            <Link style={style} to="/users">
                users
            </Link>
            <Link style={style} to="/">
                home
            </Link>

            <Routes>
                <Route path="/users/:id" element={<BlogsByUser />} />
                <Route path="/users" element={<UsersView />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    )
}

export default App
