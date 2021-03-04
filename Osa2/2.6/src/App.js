import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'
import DisplayList from './components/displayList'
import Notification from './components/notification'
import AddPerson from './components/addPerson.js'
import Filter from './components/filter'

const App = () => {
  const [ persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [ newFilter, setNewFilter ] = useState('')

  const [message, setMessage] = useState({messageString: null, success: null});

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
        if(window.confirm(`${newPerson.name} is already added to phonebook, change their number?`)){
        	
        	const person = persons.find(p => p.name === newPerson.name)
        	const changedPerson = {...person, number: newNumber};

        	personService
        		.update(person.id, changedPerson)
        		.then(returnedPerson => {
        			setPersons(persons.map(candidate => candidate.id !== person.id ? candidate : returnedPerson));
        			handleMessage(`Changed the number of '${returnedPerson.name}'.`, true)
        	})
        	.catch(error => {
        		setPersons(persons.filter(candidate => candidate.id !== person.id));
        		handleMessage(`${person.name}' was already removed from the server.`, false);
        	})

        	setNewName('');
      		setNewNumber('');
        }
      }else{
      	personService
      		.create(newPerson)
      		.then(returnedPerson => {
      			setPersons(persons.concat(returnedPerson));
      			handleMessage(`Added '${returnedPerson.name}'.`, true)
      			setNewName('');
      			setNewNumber('');
      		})
          .catch(error => {
            handleMessage(error.response.data.error, false)
          })
      }
  }

  const handleMessage = (message, success) => {

  	setMessage({messageString: message, success: success});

  	setTimeout(() => {
      	setMessage({messageString: null, success: null});
     }, 3000);
  }

  const deletePerson = (person) => {
  	if(window.confirm(`Delete ${person.name} from phonebook?`)){

  		personService
  		.deleteObject(person.id)
  		.then(initialPersons => {
  			setPersons(persons.filter(candidate => candidate.id !== person.id));
  			handleMessage(`Deleted '${person.name}'.`, true)
  		})
  	}
  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} changedFilter={changedFilter} />
      <AddPerson submitPerson={submitPerson} newName={newName} changedName={changedName} newNumber={newNumber} changedNum={changedNum} />
      <DisplayList personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )

}

export default App
