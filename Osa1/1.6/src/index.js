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
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

const Button = (props) => {
	return(
		<button onClick={props.handleClick}>{props.name}</button>
	)
}

const Statistics = (props) => {
	const total = props.good+props.neutral+props.bad;
	const avg = (props.good-props.bad)/total;
	const goodPercent = 100*(props.good/total) + " %";

	if(total <= 0){
		return(
			<div>
				<p>No feedback given!</p>
			</div>
		)
	}

	return(
		<div>
			<h1>Statistics</h1>
			<table>
				<StatisticLine text="Good" stat={props.good} />
				<StatisticLine text="Neutral" stat={props.neutral} />
				<StatisticLine text="Bad" stat={props.bad} />
				<StatisticLine text="Total" stat={total} />
				<StatisticLine text="Average" stat={avg} />
				<StatisticLine text="Positive" stat={goodPercent} />
			</table>
		</div>
	)
}

const StatisticLine = (props) => {
	return(
		<tbody>
			<tr>
				<td>{props.text}</td>
				<td>{props.stat}</td>
			</tr>
		</tbody>
	)
}



ReactDOM.render(<App />, document.getElementById('root'))