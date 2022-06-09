import { useState } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { blankUser, loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
const LoginForm = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (userObj) => {
        try {
            dispatch(loginUser(userObj))
        } catch (error) {
            dispatch(blankUser())
            dispatch(
                setNotification({
                    message: `error: ${
                        error.response
                            ? error.response.data.error
                            : error.response
                    }`,
                    type: 'error',
                })
            )
        }
    }

    const handleUsername = (event) => {
        event.preventDefault()
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        handleLogin({ username, password })
        setPassword('')
        setUsername('')
    }

    return (
        <div>
            {state.login === null && (
                <Togglable buttonLabel="Show login">
                    <form onSubmit={handleSubmit}>
                        <h3>Login in to application</h3>
                        <div>
                            username
                            <input
                                id="username"
                                value={username}
                                type="text"
                                placeholder="enter username"
                                onChange={handleUsername}
                            />
                        </div>
                        <div>
                            password
                            <input
                                id="password"
                                value={password}
                                type="password"
                                placeholder="enter password"
                                onChange={handlePassword}
                            />
                        </div>
                        <button id="login-button" type="submit">
                            Login
                        </button>
                    </form>
                </Togglable>
            )}
        </div>
    )
}

export default LoginForm
