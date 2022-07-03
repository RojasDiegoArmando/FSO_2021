import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { addComment, modifyBlog } from '../reducers/blogListReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { useState } from 'react'
import CommentForm from './CommentForm'
const BlogView = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    const { blogList } = useSelector((state) => state)
    const blog = blogList.filter((blog) => blog.id === id)[0]
    const LikeBlog = async (newBlog, id) => {
        try {
            dispatch(modifyBlog(newBlog, id))
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

    const handleLike = (event) => {
        event.preventDefault()
        const newBlog = { ...blog, likes: blog.likes + 1 }
        LikeBlog(newBlog, newBlog.id)
    }

    if (!blog) {
        return null
    }
    return (
        <div>
            <h1>
                {blog.title} {blog.author}
            </h1>
            <a href={blog.url}>{blog.url}</a>
            <p>
                {blog.likes} likes <button onClick={handleLike}>like</button>
            </p>
            <p>added by {blog.user[0].name}</p>
            <h2>Comments</h2>
            <CommentForm id={id} />
            <ul>
                {blog.comments.map((e, i) => (
                    <li key={i}>{e}</li>
                ))}
            </ul>
        </div>
    )
}

export default BlogView
