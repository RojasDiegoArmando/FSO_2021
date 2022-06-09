import { React, useState } from 'react'
import Input from '../components/Input'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogListReducer'
import { useDispatch } from 'react-redux'
const AddBlogForm = ({ toggableRef }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createNewBlog = async (newBlog) => {
        try {
            dispatch(createBlog(newBlog))
            dispatch(
                setNotification(
                    {
                        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
                        type: 'add',
                    },
                    5000
                )
            )
            toggableRef.current.toggleVisibility()
        } catch (error) {
            dispatch(
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
            )
        }
    }

    const handleNewBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url,
            likes: 0,
        }
        createNewBlog(newBlog)
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    const inputObjects = [
        {
            text: 'title',
            value: title,
            handleValue: setTitle,
        },
        {
            text: 'author',
            value: author,
            handleValue: setAuthor,
        },
        {
            text: 'url',
            value: url,
            handleValue: setUrl,
        },
    ]

    return (
        <form onSubmit={handleNewBlog}>
            {inputObjects.map((input, i) => (
                <Input
                    key={i}
                    text={input.text}
                    value={input.value}
                    handleValue={input.handleValue}
                />
            ))}
            <button id="newBlog-button" type="submit">
                Add
            </button>
        </form>
    )
}

export default AddBlogForm
