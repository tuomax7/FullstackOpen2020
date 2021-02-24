import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const courses =[

     {
	    name: 'Half Stack application development',
	    id: 1,
	    parts: [
	      {
	        name: 'Fundamentals of React',
	        exercises: 10,
	        id: 1
	      },
	      {
	        name: 'Using props to pass data',
	        exercises: 7,
	        id: 2
	      },
	      {
	        name: 'State of a component',
	        exercises: 14,
	        id: 3
	      },
	      {
	      	name: 'Redux',
	      	exercises: 11,
	      	id: 4
	      }
	    ]
	 },
	 {
	     name: 'Node.js',
	     id: 2,
	     parts: [
	       {
	         name: 'Routing',
	         exercises: 3,
	         id: 1
	       },
	       {
	         name: 'Middlewares',
	         exercises: 7,
	         id: 2
	       }
	    ]
	 }
	]

  return (
    <div>
      	<Courses courses={courses} />
    </div>
  )
}

const Courses = ({courses}) => {
	return(
		<div>
			<h1>Web development curriculum</h1>
			{courses.map(course => <Course key={course.id} course={course} />)}
		</div>
	)
}

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



ReactDOM.render(<App />, document.getElementById('root'))


