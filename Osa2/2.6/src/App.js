import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 'Arto Hellas'},
  ]) 

  const [ newName, setNewName ] = useState('')


  const changedInput = (event) => {
      setNewName(event.target.value);
  }

  const submitPerson = (event) => {
      event.preventDefault();

      const newPerson = {
        name: newName
      }

      setPersons(persons.concat(newPerson));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitPerson}>
        <div>
          Name: <input value={newName} onChange={changedInput}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>


      <h2>Numbers</h2>

      {persons.map(person => <p key={person.name}>{person.name}</p>)}
      
    </div>
  )

}

export default App
