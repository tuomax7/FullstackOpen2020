import { DiaryEntry } from "../types";

interface DiaryProps {
	entries: DiaryEntry[];
}

const DiaryEntries = (props: DiaryProps) => {

  return (
    <div>
      {props.entries.map(diaryEntry => 
				<div key={diaryEntry.id}>
					<h2>{diaryEntry.date}</h2>
					<p>Visibility: {diaryEntry.visibility}</p>
					<p>Weather: {diaryEntry.weather}</p>
				</div>
			)}
    </div>
  );
};

export default DiaryEntries;