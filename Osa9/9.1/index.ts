import express from 'express';
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser());

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, parseArguments } from "./exerciseCalculator";



app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);

    const weight = Number(_req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0) {
			res.status(400);
			res.send({error: "Malformatted params."});
		};
    res.send({
        height,
        weight,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = _req.body;

	if (!daily_exercises || !target){
		res.status(400);
		res.send({error: "parameters missing"}); 
	} else {
		try {
			const { targetHours, dailyExerciseHours } = parseArguments(target, daily_exercises);
			res.send(calculateExercises(dailyExerciseHours, targetHours));

		} catch(e){
			res.status(400); 
			res.send({error: e.message});
		}

	}

});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});