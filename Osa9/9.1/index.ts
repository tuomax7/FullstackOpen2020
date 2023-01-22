import express from 'express';
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser());

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";


app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);

    const weight = Number(_req.query.weight);

    if (isNaN(height) || isNaN(weight) || height <= 0) res.send({error: "Malformatted params."});
    res.send({
        height,
        weight,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const body = _req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const exerciseData = calculateExercises(body.daily_exercises, body.target);
  res.json(exerciseData);
});


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});