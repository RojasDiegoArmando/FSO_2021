import { useDispatch, useSelector } from 'react-redux'
import { blankUser, loginUser } from '../reducers/loginReducer'
import blogServices from '../services/blogs'

const LogoutForm = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBloglistUser')
        dispatch(blankUser())
        blogServices.setToken('')
    }
    const style = {
        padding: 5,
    }
    return (
        <div>
            {state.login !== null && (
                <div>
                    <strong style={style}>
                        {state.login.name} is logged in
                    </strong>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    )
}

export default LogoutForm
