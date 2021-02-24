import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    {name: "Hätäkeskus", number: 112},
  ]) 

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')


  const changedName = (event) => {
      setNewName(event.target.value);
  }

  const changedNum = (event) => {
      setNewNumber(event.target.value);
  }

  const submitPerson = (event) => {
      event.preventDefault();

      const newPerson = {
        name: newName,
        number: newNumber
      }

      if(persons.find(person => person.name === newPerson.name)){
        window.alert(`${newPerson.name} is already added to phonebook`)
      }else{
        setPersons(persons.concat(newPerson));
      }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitPerson}>
          <div>Name: <input value={newName} onChange={changedName}/></div>
          <div>Number: <input value={newNumber} onChange={changedNum}/></div>
          <div><button type="submit">Add</button></div>
      </form>


      <h2>Numbers</h2>

      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      
    </div>
  )

}

export default App
