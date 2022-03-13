
const LogoutForm = ({ name, handleLogout }) => {
    return (
        <div>
            <strong>{name} is logged in</strong>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LogoutForm