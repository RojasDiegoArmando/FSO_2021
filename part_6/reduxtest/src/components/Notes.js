import { connect } from 'react-redux'
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

const Notes = (props) => {
    const handleToggle = async (note) => {
        const newNote = await noteService.toggleImportance({ ...note, important: !note.important })
        props.toggleImportanceOf(newNote)
    }
    //const notes = useSelector(state => state.notes)

    return (
        <ul>
            {props.notes.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => handleToggle(note)}
                />
            )}
        </ul>
    )
}

const mapDispatchToProps = {
    toggleImportanceOf,
}

const mapStateToProps = (state) => {
    if (state.filter === 'ALL') {
        return {
            notes: state.notes
        }
    }

    return {
        notes: (state.filter === 'IMPORTANT')
            ? state.filter(note => note.important)
            : state.filter(note => !note.important)
    }
}

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes)
export default ConnectedNotes