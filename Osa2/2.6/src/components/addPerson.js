import React from 'react'

const AddPerson = ({submitPerson, newName, changedName, newNumber, changedNum}) => {
  return(
    <form onSubmit={submitPerson}>
        <div>Name: <input value={newName} onChange={changedName}/></div>
        <div>Number: <input value={newNumber} onChange={changedNum}/></div>
        <div><button type="submit">Add</button></div>
    </form>
  )
}

export default AddPerson