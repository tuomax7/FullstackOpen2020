import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	

	return (
		<div>
			<h1>Give feedback!</h1>
			<Button handleClick={() => setGood(good+1)} name="good" />
			<Button handleClick={() => setNeutral(neutral+1)} name="neutral" />
			<Button handleClick={() => setBad(bad+1)} name="bad" />
			<StatsView good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

const Button = (props) => {
	return(
		<button onClick={props.handleClick}>{props.name}</button>
	)
}

const StatsView = (props) => {
	return(
		<div>
			<h1>Statistics</h1>
			<p>Good {props.good}</p>
			<p>Neutral {props.neutral}</p>
			<p>Bad {props.bad}</p>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))