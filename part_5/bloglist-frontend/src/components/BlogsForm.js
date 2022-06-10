import React, { useRef } from 'react'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import { useSelector } from 'react-redux'
import UsersView from './UsersView'

const BlogsForm = ({ toggableRef }) => {
    const state = useSelector((state) => state)
    const { blogList } = state
    console.log(state)
    return (
        <div>
            {state.login !== null && (
                <div>
                    <Togglable buttonLabel="Create new blog" ref={toggableRef}>
                        <AddBlogForm toggableRef={toggableRef} />
                    </Togglable>
                    <br />
                    <div id="blog-all">
                        {blogList.map((blog, i) => (
                            <Blog key={i} blog={blog} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default BlogsForm
