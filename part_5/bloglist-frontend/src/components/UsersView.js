import { useSelector } from 'react-redux'
import { Link, Routes, Route } from 'react-router-dom'
import BlogsByUser from './BlogsByUser'

const UsersView = () => {
    const state = useSelector((state) => state)

    const blogs = state.blogList

    const users = blogs.map((blog) => blog.user)

    const newMap = new Map()

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
    console.log(blogsByAuthor)

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

            <Routes>
                <Route path="/users/:id" element={<BlogsByUser />} />
            </Routes>
        </div>
    )
}

export default UsersView
