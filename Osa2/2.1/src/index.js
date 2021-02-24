import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
    name: 'Half Stack application development',
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
      }
    ]
  }

  return (
    <div>
      	<Course course={course}/>
    </div>
  )
}

const Course = ({course}) => {

	return(
		<div>
			<h1>{course.name}</h1>

			<ul>
				{course.parts.map(part =>
					<li key={part.id}>{part.name} {part.exercises}</li>
				)}
			</ul>

		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))


