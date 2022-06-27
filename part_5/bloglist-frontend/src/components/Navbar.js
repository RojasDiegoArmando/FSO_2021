import { Link } from 'react-router-dom'
import LogoutForm from './LogoutForm'

const Navbar = () => {
    const style = {
        padding: 5,
    }
    return (
        <div className="navbar">
            <Link style={style} to="/users">
                users
            </Link>
            <Link style={style} to="/">
                home
            </Link>
            <LogoutForm />
        </div>
    )
}

export default Navbar
