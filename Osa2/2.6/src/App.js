import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

  const changedFilter = (event) => {
    setNewFilter(event.target.value)
  }


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


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter));

  return (
    <div>
      <h2>Phonebook</h2>

      Filter shown with <input value={newFilter} onChange={changedFilter}/> 

      <form onSubmit={submitPerson}>
          <div>Name: <input value={newName} onChange={changedName}/></div>
          <div>Number: <input value={newNumber} onChange={changedNum}/></div>
          <div><button type="submit">Add</button></div>
      </form>


      <h2>Numbers</h2>

      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      
    </div>
  )

}

export default App
