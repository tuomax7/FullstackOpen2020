import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVotes(state, action) {
      const anecdoteToVote = action.payload
      const votedAnecdote = {
        ...anecdoteToVote, votes: anecdoteToVote.votes + 1
      }

      return state.map(anecdote => 
        anecdote.id !== anecdoteToVote.id ? anecdote : votedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },


})

export const { increaseVotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch(increaseVotes(votedAnecdote))
  }
}

export default anecdoteSlice.reducer