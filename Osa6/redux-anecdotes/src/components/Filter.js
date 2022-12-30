import { updateSearch } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={event => props.updateSearch(event.target.value)} />
      </div>
    )
}
  
const mapDispatchToProps = {
  updateSearch,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter