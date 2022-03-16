import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const newNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        props.createAnecdote(content)
        props.setNotification('Anecdote added!', 5000)
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

const mapDispatchToProps = {
    setNotification,
    createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)