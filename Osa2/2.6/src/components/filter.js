import React from 'react'

const Filter = ({newFilter, setNewFilter, changedFilter}) => {
   return (
    <div>
     Filter shown with <input value={newFilter} onChange={changedFilter}/>
    </div>
  )
}

export default Filter