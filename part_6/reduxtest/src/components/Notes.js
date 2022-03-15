import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'
const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()

    const handleToggle = async (note) => {
        const newNote = await noteService.toggleImportance({ ...note, important: !note.important })
        dispatch(toggleImportanceOf(newNote))
    }

    const notes = useSelector(({ filter, notes }) => {
        if (filter === 'ALL') {
            return notes
        }
        return filter === 'IMPORTANT'
            ? notes.filter(note => note.important)
            : notes.filter(note => !note.important)
    })
    //const notes = useSelector(state => state.notes)

    return (
        <ul>
            {notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => handleToggle(note)}
                />
            )}
        </ul>
    )
}

export default Notes