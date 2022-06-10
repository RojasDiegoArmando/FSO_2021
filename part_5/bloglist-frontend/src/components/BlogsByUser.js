import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogsByUser = () => {
    const id = useParams().id
    const { blogList } = useSelector((state) => state)
    const blogs = blogList.filter((blog) => blog.user[0].id === id)
    if (!blogs) {
        return null
    }
    return (
        <div>
            {blogs !== null && (
                <div>
                    <h1>{blogs[0].user[0].name}</h1>
                    <strong>added blogs</strong>

                    <ul>
                        {blogs.map((blog, i) => (
                            <li key={i}>{blog.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default BlogsByUser
