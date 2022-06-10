import { useRef } from 'react'
import Notification from './Notifications'
import LogoutForm from './LogoutForm'
import LoginForm from './LoginForm'
import BlogsForm from './BlogsForm'

const Home = () => {
    const blogRef = useRef()
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

export default Home
