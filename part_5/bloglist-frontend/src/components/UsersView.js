import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeBlogList } from '../reducers/blogListReducer'
const UsersView = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogList())
    }, [])
    const state = useSelector((state) => state)
    const blogs = state.blogList

    let blogsByAuthorMap = blogs.reduce((acc, curr) => {
        const { name, id } = curr.user[0]
        if (acc.has(name)) {
            acc.set(name, { name, id, blogs: acc.get(name).blogs + 1 })
        } else {
            acc.set(name, { name, id, blogs: 1 })
        }
        return acc
    }, new Map())

    const blogsByAuthor = [...blogsByAuthorMap.values()]

    if (!blogsByAuthor) {
        return null
    }

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {blogsByAuthor.map((blog, i) => (
                        <tr key={i}>
                            <td>
                                <Link to={`/users/${blog.id}`}>
                                    {blog.name}
                                </Link>
                            </td>
                            <td>{blog.blogs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersView
