import { React, useState, useRef } from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const LoginForm = ({ newLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const toggableRef = useRef()

    const handleLogin = async (event) => {
        event.preventDefault()
        const userObj = ({ username, password })
        console.log(toggableRef)
        newLogin(userObj)
        setPassword('')
        setUsername('')
        toggableRef.current.toggleVisibility()
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <Togglable buttonLabel='Show login' ref={toggableRef}>
            <div>
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            id='username'
                            type="text"
                            value={username}
                            name="Username"
                            placeholder='enter username'
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        password
                        <input
                            id='password'
                            type="password"
                            value={password}
                            name="Password"
                            placeholder='enter password'
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div>
                        <button id='login-button' type='submit'>login</button>
                    </div>
                </form>
            </div>
        </Togglable>
    )
}

LoginForm.propTypes = {
    newLogin: PropTypes.func.isRequired
}

export default LoginForm