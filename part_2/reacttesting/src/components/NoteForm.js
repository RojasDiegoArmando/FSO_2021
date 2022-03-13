import { useState, useRef } from 'react'
import Togglable from './Togglable'

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('')
    const toggableRef = useRef()

    const handleChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            important: false,
        })
        setNewNote('')
        toggableRef.current.toggleVisibility()
    }

    return (
        <Togglable buttonLabel={'New note'} ref={toggableRef}>
            <div>
                <h2>Create a new note</h2>

                <form onSubmit={addNote}>
                    <input
                        value={newNote}
                        onChange={handleChange}
                        placeholder='write here note content'
                    />
                    <button type='submit'>save</button>
                </form>
            </div >
        </Togglable>
    )
}

export default NoteForm