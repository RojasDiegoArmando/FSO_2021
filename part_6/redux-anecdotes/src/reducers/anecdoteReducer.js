import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)
/*
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'VOTE':
      const id = action.data.id
      const noteToVote = state.find(note => note.id === id)
      const noteChanged = {
        ...noteToVote,
        votes: noteToVote.votes + 1
      }
      return state.map(note => note.id !== id ? note : noteChanged)
    default:
      return state
  }
}
*/
const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, actions) {
      const id = actions.payload.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : actions.payload)
    },
    appendAnecdotes(state, actions) {
      state.push(actions.payload)
    },
    setAnecdotes(state, actions) {
      return actions.payload
    }
  }
})

export const { appendAnecdotes, setAnecdotes, updateAnecdote } = anecdoteReducer.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote))
  }
}

export const updateVote = (object) => {
  return async dispatch => {
    const updatedVote = await anecdoteService.updateVote(object)
    dispatch(updateAnecdote(updatedVote))
  }
}

export default anecdoteReducer.reducer