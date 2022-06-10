import { useState } from 'react'
import '../Blogs.css'
import { setNotification } from '../reducers/notificationReducer'
import { updateVote, deleteBlogFromList } from '../reducers/blogListReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const deleteBlog = async (blogToDelete) => {
        try {
            dispatch(deleteBlogFromList(blogToDelete))
            dispatch(
                setNotification(
                    {
                        message: `${blogToDelete.title} deleted!`,
                        type: 'error',
                    },
                    5000
                )
            )
        } catch (error) {
            setNotification(
                {
                    message: `error: ${
                        error.response
                            ? error.response.data.error
                            : error.response
                    }`,
                    type: 'error',
                },
                5000
            )
        }
    }

    const toggleVisibility = () => setVisible(!visible)

    const handleDelete = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog)
        }
    }

    return (
        <div className="blog">
            <div id="blog-show">
                <div>
                    <Link style={{ padding: 10 }} to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}{' '}
                    </Link>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Blog

/*
<div style={hideWhenVisible} id="blog-hide">
                {blog.title} {blog.author}{' '}
                <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible} id="blog-show">
                <div>
                    <Link to={`/blogs/${blog.id}`}>
                        {blog.title} {blog.author}{' '}
                    </Link>
                    <button onClick={toggleVisibility}>hide</button>
                </div>

                <button onClick={handleDelete}>Delete</button>
            </div>
            */
