import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
import { setTimmer } from '../reducers/timmerReducer'
const AnecdoteList = (props) => {
    const state = useSelector(state => state)
    const allAnecdotes = state.anecdotes
    const filteredAnecdotes = state.filter === ''
        ? allAnecdotes
        : allAnecdotes.filter(note => note.content.toUpperCase().includes(state.filter.toUpperCase()) > 0)
    //const anecdotes = Allanecdotes.sort((a, b) => b.votes - a.votes)

    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
    console.log(filteredAnecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        const votedAnecdote = allAnecdotes.find(a => a.id === id)
        dispatch(addVote(id))
        clearTimeout(state.timmer)
        dispatch(createNotification(`you voted '${votedAnecdote.content}'`))
        dispatch(setTimmer(setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)))
    }
    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList