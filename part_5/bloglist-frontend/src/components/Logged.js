import { React } from 'react'
import Blog from '../components/Blog'
import AddBlogForm from '../components/AddBlogForm'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'

const Logged = ({ toggableRef, createNewBlog, modifyBlog, deleteBlog }) => {
    const state = useSelector((state) => state)
    const { blogList } = state
    return (
        <div>
            <Togglable buttonLabel="Create new blog" ref={toggableRef}>
                <AddBlogForm createNewBlog={createNewBlog} />
            </Togglable>
            <br />
            <div id="blog-all">
                {blogList.map((blog, i) => (
                    <Blog
                        key={i}
                        blog={blog}
                        modifyBlog={modifyBlog}
                        deleteBlog={deleteBlog}
                    />
                ))}
            </div>
        </div>
    )
}

export default Logged
