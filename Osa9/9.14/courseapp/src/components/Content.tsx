import { CoursePart } from "../types";

interface PartProps {
	part: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {

	switch(props.part.kind) {
		case "basic":
			return (
				<div>
					<h3>{props.part.name} {props.part.exerciseCount}</h3>
					<p>{props.part.description}</p>
				</div>
			)
				

		case "group":
			return (
				<div>
					<h3>{props.part.name} {props.part.exerciseCount}</h3>
					<p>Group projects: {props.part.groupProjectCount}</p>
				</div>
			)

		case "background":
			return (
				<div>
					<h3>{props.part.name} {props.part.exerciseCount}</h3>
					<p>Optional read: {props.part.backgroundMaterial}</p>
				</div>
			)

		case "special":
			return (
				<div>
					<h3>{props.part.name} {props.part.exerciseCount}</h3>
					<p>Requirements: {props.part.requirements.toString()}</p>
				</div>
			)

		default:
			return assertNever(props.part);

	}
	
}

interface ContentProps {
	courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {

  return (
    <div>
				{props.courseParts.map(part => <Part key={part.name} part={part}/>)}
    </div>
  );
};

export default Content;