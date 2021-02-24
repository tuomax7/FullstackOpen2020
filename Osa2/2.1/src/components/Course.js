import React from 'react'

const Course = ({course}) => {
	return(
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

const Header = ({name}) => {
	return(
		<div>
			<h2>{name}</h2>
		</div>
	)
}

const Content = ({parts}) => {
	return(
		<div>
			<ul>
				{parts.map(part => <Part key={part.id} part={part} />)}
			</ul>
		</div>
	)
}

const Part = ({part}) => {
	return(
		<li>{part.name} {part.exercises} </li>
	)
}

const Total = ({parts}) => {

	const total = parts.reduce((sum, part) => sum + part.exercises, 0)

	return(
		<p><b>Total of {total} exercises.</b></p>
	)
}

export default Course