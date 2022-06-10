import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updateVote } from '../reducers/blogListReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogView = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    const { blogList } = useSelector((state) => state)
    const blog = blogList.filter((blog) => blog.id === id)[0]
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

    const handleLike = (event) => {
        event.preventDefault()
        const newBlog = { ...blog, likes: blog.likes + 1 }
        modifyBlog(newBlog, newBlog.id)
    }

    if (!blog) {
        return null
    }
    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>
                {blog.likes} likes <button onClick={handleLike}>like</button>
            </p>
            <p>added by {blog.author}</p>
        </div>
    )
}

export default BlogView
