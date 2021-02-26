import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
  	personService
  		.getAll()
  		.then(initialPersons => {
  			setPersons(initialPersons)
  		})
  }, [])

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
      	personService
      		.create(newPerson)
      		.then(returnedPerson => {
      			setPersons(persons.concat(returnedPerson));
      			setNewName('');
      			setNewNumber('');
      		})
      }

  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} setNewFilter={setNewFilter} changedFilter={changedFilter} />
      <AddPerson submitPerson={submitPerson} newName={newName} changedName={changedName} newNumber={newNumber} changedNum={changedNum} />
      <DisplayList personsToShow={personsToShow} />
    </div>
  )

}

const Filter = ({newFilter, setNewFilter, changedFilter}) => {
   return (
    <div>
     Filter shown with <input value={newFilter} onChange={changedFilter}/>
    </div>
  )
}

const AddPerson = ({submitPerson, newName, changedName, newNumber, changedNum}) => {
  return(
    <form onSubmit={submitPerson}>
        <div>Name: <input value={newName} onChange={changedName}/></div>
        <div>Number: <input value={newNumber} onChange={changedNum}/></div>
        <div><button type="submit">Add</button></div>
    </form>
  )
}

const DisplayList = ({personsToShow}) => {
  return(
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
