import React, {useState, useEffect} from 'react'
import axios from 'axios'

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




	const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()));

	return(
		<div>
			<h1>Country database</h1>
			<Filter newFilter={newFilter} changedFilter={changedFilter} />
			<Display countriesToShow={countriesToShow} />

		</div>

	)
}

const Filter = ({newFilter, changedFilter}) => {

	return (
		<div>
			Search countries by name <input value={newFilter} onChange={changedFilter} />
		</div>
	)
}

const Display = ({countriesToShow}) => {

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
				{countriesToShow.map(country => <p key={country.name}>{country.name}</p>)}

			</div>
		)
	}

}

const CountryInfo = ({country}) => {

	return(
		<div>
			<h2>{country.name}</h2>

			<p>Capital: {country.capital}</p>
			<p>Population: {country.population}</p>

			<h3>Languages</h3>
			<ul>
				{country.languages.map(language => <li key={language.name}>{language.name}</li>)}
			</ul>

			<img src={country.flag} alt={country.name} width="180" height="110"/>
		</div>
	)

}

export default App;
