import { useState } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
        <Togglable buttonLabel='Show login'>
            <form onSubmit={handleSubmit}>
                <h3>Login in to application</h3>
                <div>
                    username
                    <input
                        id='username'
                        value={username}
                        type="text"
                        placeholder="enter username"
                        onChange={handleUsername}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        value={password}
                        type="password"
                        placeholder="enter password"
                        onChange={handlePassword}
                    />
                </div>
                <button id='login-button' type='submit'>Login</button>
            </form>
        </Togglable>
    )
}

Togglable.propTypes = {
    handleLogin: PropTypes.func.isRequired
}

export default LoginForm