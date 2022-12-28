import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import Filter from '../components/Filter.js'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = [...anecdotes].filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))

        const votedAnecdote = anecdotes.find(a => a.id === id)

        dispatch(showNotification(`'${votedAnecdote.content}' voted!`))

        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }

    return(
        <div>
        <Filter />

        {sortedAnecdotes
        .map(anecdote =>
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