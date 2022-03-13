import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import notesService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import NoteForm from './components/NoteForm'

const App = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        notesService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            notesService.setToken(user.token)
        }
    }, [])

    const toggleImportanceOf = (id) => {
        const note = notes.find(note => note.id === id)
        const changedNote = { ...note, important: !note.important }
        notesService
            .update(id, changedNote)
            .then(returnedNote => {
                console.log(returnedNote)
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch((error) => {
                console.log(error)
                setMessage(
                    `the note ${note.content} has already been deleted from the server`
                )
                setMessageType('error')
                setTimeout(() => {
                    setMessage(null)
                    setMessageType('')
                }, 5000)
                setNotes(notes.filter(note => note.id !== id))
            })
    }

    const addNote = (noteObj) => {
        notesService
            .create(noteObj)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
            })
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        setUser(null)
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    const newLogin = async (userObj) => {
        try {
            console.log(userObj)
            const user = await loginService.login(userObj)
            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            notesService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            console.log(exception.message)
            setMessage('Wrong Credentials')
            setMessageType('error')
            setTimeout(() => {
                setMessage(null)
                setMessageType('')
            }, 5000)
        }
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={message} type={messageType} />
            {user !== null && <LogoutForm name={user.name} handleLogout={handleLogout} />}
            {
                user === null
                    ? <LoginForm newLogin={newLogin} />
                    : <NoteForm createNote={addNote} />
            }
            <br />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                )}
            </ul>
            <Footer />
        </div>
    )
}

export default App
