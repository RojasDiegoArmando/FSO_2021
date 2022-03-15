import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const newNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification('Anecdote added!', 5000))
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