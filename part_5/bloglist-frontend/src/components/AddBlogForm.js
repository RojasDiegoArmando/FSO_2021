import { React, useState } from 'react'
import Input from '../components/Input'

const AddBlogForm = ({ createNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url,
            likes: 0
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
            handleValue: setTitle
        },
        {
            text: 'author',
            value: author,
            handleValue: setAuthor
        },
        {
            text: 'url',
            value: url,
            handleValue: setUrl
        },
    ]

    return (
        <form onSubmit={handleNewBlog}>
            {inputObjects.map((input, i) => <Input key={i} text={input.text} value={input.value} handleValue={input.handleValue} />)}
            <button id='newBlog-button' type='submit'>Add</button>
        </form>
    )
}

export default AddBlogForm