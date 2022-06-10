import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogList } from '../reducers/blogListReducer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import blogService from '../services/blogs'
const BlogsByUser = () => {
    const [blogs, setBlogs] = useState([])
    const id = useParams().id
    let blogList = ''
    let username = ''
    useEffect(async () => {
        blogList = await blogService.getAll()
        console.log(blogList)
        const blogs2 = blogList.filter((blog) => blog.user[0].id === id)
        username = blogs2[0].user[0].name
        console.log(username)
        setBlogs(blogs2)
    }, [])
    return (
        <div>
            {blogs !== null && (
                <div>
                    <h1>{username}</h1>
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
