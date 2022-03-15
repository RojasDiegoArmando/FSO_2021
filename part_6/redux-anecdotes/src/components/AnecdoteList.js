import { useSelector, useDispatch } from 'react-redux'
import { updateVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setTimmer } from '../reducers/timmerReducer'

const AnecdoteList = (props) => {
    const state = useSelector(state => state)
    const allAnecdotes = state.anecdotes
    const filteredAnecdotes = state.filter === ''
        ? allAnecdotes
        : allAnecdotes.filter(note => note.content.toUpperCase().includes(state.filter.toUpperCase()) > 0)
    //const anecdotes = Allanecdotes.sort((a, b) => b.votes - a.votes)

    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = async (id) => {
        const votedAnecdote = allAnecdotes.find(a => a.id === id)
        const newAnecdote = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
        //const response = await anecdotesServices.updateVote(newAnecdote)
        dispatch(updateVote(newAnecdote))
        clearTimeout(state.timmer)
        dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 10000))
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