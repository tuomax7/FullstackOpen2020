import { useState, useEffect } from 'react';
import { DiaryEntry, NewEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

import DiaryEntries from './components/DiaryEntries';

const App = () => {
	const [newDate, setNewDate] = useState('');
	const [newVisibility, setNewVisibility] = useState('');
	const [newWeather, setNewWeather] = useState('');
	const [newComment, setNewComment] = useState('');
	const [error, setError] = useState('');

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

	const entryCreation = (event: React.SyntheticEvent) => {
		event.preventDefault()
    const entryToAdd: NewEntry = {
			date: newDate,
			weather: newWeather,
			visibility: newVisibility,
			comment: newComment
    }
    createDiary(entryToAdd).then(data => {
      setDiaries(diaries.concat(data))
    })
		.catch(err => {
      const errorMessage = err.response.data;
      setError(errorMessage);
    })
    setNewComment('');
		setNewDate('');
		setNewVisibility('');
		setNewWeather('');

	}


  return (
    <div>
			<form onSubmit={entryCreation}>
				<h2>Add a new entry:</h2>
				<p style={{color: "red"}}>{error}</p>
				<div>
					Date: 
					<input
						value={newDate}
						onChange={(event) => setNewDate(event.target.value)} 
					/>
				</div>
				
				<div>
					Visibility: 
					<input
						value={newVisibility}
						onChange={(event) => setNewVisibility(event.target.value)} 
					/>
				</div>
				
				<div>
					Weather: 
					<input
						value={newWeather}
						onChange={(event) => setNewWeather(event.target.value)} 
					/>
				</div>
				
				<div>
					Comment: 
					<input
						value={newComment}
						onChange={(event) => setNewComment(event.target.value)} 
					/>
				</div>
				
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
			<DiaryEntries entries={diaries}/>
    </div>
  );
};

export default App;