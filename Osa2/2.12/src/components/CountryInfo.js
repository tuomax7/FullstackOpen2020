import React, {useState, useEffect} from 'react'
import axios from 'axios'

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

			<CapitalWeather capital={country.capital} />
		</div>
	)

}

const CapitalWeather = ({capital}) => {

	const [ weather, setWeather ] = useState([]);

	const api_key = process.env.REACT_APP_API_KEY;

	useEffect(()=> {
		axios
			.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
			.then(response => {
				setWeather(response.data)
			})
	}, [])

	if(weather.current != null){
		return(
			<div>
				<h3>Weather in {capital} </h3>
				<p><b>Temperature:</b> {weather.current.temperature}° Celsius</p>
				<img alt={capital} src={weather.current.weather_icons[0]}/>
				<p><b>Wind: </b> {weather.current.wind_speed} mph direction {weather.current.wind_dir} </p>
			</div>
		)
	}

	return (
		<div>
			<p>Could not find weather data.</p>

		</div>
	)
}

export default CountryInfo
