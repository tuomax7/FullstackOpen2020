import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryInfo from './components/CountryInfo'

const App = () => {

	const [countries, setCountries] = useState([]);


	const [ newFilter, setNewFilter ] = useState('');

	useEffect(()=> {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	const changedFilter = (event) => {
		setNewFilter(event.target.value);
	}

	const handleClick = (event) => {
		setNewFilter(event.target.id);
	}

	const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()));

	return(
		<div>
			<h1>Country database</h1>
			<Filter newFilter={newFilter} changedFilter={changedFilter} />
			<Display countriesToShow={countriesToShow} handleClick={handleClick} />
		</div>

	)
}

const Filter = ({newFilter, changedFilter}) => {

	return (
		<div>
			Search countries by name <input id="filter" value={newFilter} onChange={changedFilter} />
		</div>
	)
}

const Display = ({countriesToShow, handleClick}) => {

	if(countriesToShow.length > 10){
		return(
			<p>Too many matches, specify another filter, please.</p>
		)
	}else if(countriesToShow.length === 1){
		return(
			<CountryInfo country={countriesToShow[0]} />
		)
	}else{
		return(
			<div>
				<h3>Countries that match your search:</h3>
				{countriesToShow.map(country => <Country key={country.name} country={country} handleClick={handleClick} />)}

			</div>
		)
	}

}

const Country = ({country, handleClick}) => {
	return(
		<div>
			{country.name} <button id={country.name} onClick={handleClick}>Show</button>
		</div>
	)
}

export default App;
