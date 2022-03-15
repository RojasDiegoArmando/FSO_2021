import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createNote(content))
        dispatch(createNotification('Note added'))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
    return (
        <form onSubmit={newNote}>
            <h2>Create new</h2>
            <div>
                <input name='note' />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

export default AnecdoteForm