
const logoutForm = ({ name, handleLogout }) => (
    <div>
        <strong>{name} logged in!</strong>
        <button onClick={handleLogout}>
            logout
        </button>
        <br />
    </div>
)

export default logoutForm