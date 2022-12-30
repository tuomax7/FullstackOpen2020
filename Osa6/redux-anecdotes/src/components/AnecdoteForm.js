import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        props.createAnecdote(content)

        props.setNotification('Anecdote added successfully', 10)
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='content' /></div>
                <button type='submit'>create</button>
            </form>
        </div>  
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}
  
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
  
export default ConnectedAnecdoteForm