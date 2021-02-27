import React from 'react'

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

export default DisplayList