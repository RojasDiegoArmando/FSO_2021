import { React } from 'react'
import Blog from '../components/Blog'
import AddBlogForm from '../components/AddBlogForm'
import Togglable from './Togglable'

const Logged = ({ blogs, toggableRef, createNewBlog, modifyBlog, deleteBlog }) => {

    return (
        <div>
            <Togglable buttonLabel='Create new blog' ref={toggableRef}>
                <AddBlogForm createNewBlog={createNewBlog} />
            </Togglable>
            <br />
            <div id='blog-all'>
                {
                    blogs.map((blog, i) => <Blog key={i} blog={blog} modifyBlog={modifyBlog} deleteBlog={deleteBlog} />)
                }
            </div>
        </div>
    )
}

export default Logged