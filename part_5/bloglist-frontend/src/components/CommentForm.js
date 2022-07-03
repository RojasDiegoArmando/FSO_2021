import { useSelector } from 'react-redux'
import { addComment, modifyBlog } from '../reducers/blogListReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { useState } from 'react'
import { useRef } from 'react'

const CommentForm = ({ id }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const toggableRef = useRef()
    const commentBlog = async (comment, id) => {
        try {
            dispatch(addComment(comment, id))
            dispatch(
                setNotification(
                    {
                        message: 'Comment added!',
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
    const handleComment = (event) => {
        event.preventDefault()
        setComment(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const commentObj = {
            comment: comment,
        }
        commentBlog(commentObj, id)
        setComment('')
    }
    return (
        <div>
            <Togglable buttonLabel="add comment" ref={toggableRef}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            id="comment"
                            value={comment}
                            type="text"
                            placeholder="write your comment here"
                            onChange={handleComment}
                        />
                        <button type="submit">submit comment</button>
                    </div>
                </form>
            </Togglable>
        </div>
    )
}

export default CommentForm
