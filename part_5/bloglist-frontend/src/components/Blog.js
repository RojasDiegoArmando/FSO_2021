import { useState } from 'react'
import '../Blogs.css'
import { setNotification } from '../reducers/notificationReducer'
import { updateVote, deleteBlogFromList } from '../reducers/blogListReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const modifyBlog = async (newBlog, id) => {
        try {
            dispatch(updateVote(newBlog, id))
            dispatch(
                setNotification(
                    {
                        message: `Like added to ${newBlog.title}`,
                        type: 'add',
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

    const handleLike = (event) => {
        event.preventDefault()
        const newBlog = { ...blog, likes: blog.likes + 1 }
        modifyBlog(newBlog, newBlog.id)
    }

    const handleDelete = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
            deleteBlog(blog)
        }
    }

    return (
        <div className="blog">
            <div style={hideWhenVisible} id="blog-hide">
                {blog.title} {blog.author}{' '}
                <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible} id="blog-show">
                <div>
                    {blog.title} {blog.author}{' '}
                    <button onClick={toggleVisibility}>hide</button>
                </div>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes}{' '}
                    <button onClick={handleLike}>like</button>
                </div>

                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default Blog
