import { useDispatch } from 'react-redux'
import { updateSearch } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      const search = event.target.value
        dispatch(updateSearch(search))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
}
  
export default Filter