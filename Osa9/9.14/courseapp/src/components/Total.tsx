import { CoursePart } from "../types";

interface ContentProps {
	courseParts: CoursePart[];
}

const Total = (props: ContentProps) => {

  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;