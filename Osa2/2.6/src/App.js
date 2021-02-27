import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

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
        			setNewName('');
      			setNewNumber('');
        	})
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

const DisplayList = ({personsToShow, deletePerson}) => {
  return(
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/> ) }
    </div>
  )
}

const Person = ({person, deletePerson}) => {
	return(
		<div>
			{person.name} {person.number} <button onClick={() => deletePerson(person)}>Delete</button>
		</div>
	)
}

const Notification = ({message}) => {

	if(message.messageString !== null){
		return(
			<div className={message.success ? 'success' : 'error'}>
				{message.messageString}
			</div>
		)
	}else{
		return(
			<div></div>
		)
	}

}

export default App
