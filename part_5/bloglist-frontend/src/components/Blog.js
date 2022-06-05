import { useState } from 'react'
import '../Blogs.css'

const Blog = ({ blog, modifyBlog, deleteBlog }) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

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
