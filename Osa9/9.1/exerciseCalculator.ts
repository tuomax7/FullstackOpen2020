interface ExerciseValues {
  targetHours: number;
  dailyExerciseHours: Array<number>;
}

export const parseArguments = (target: number, dailyExercises: Array<number>): ExerciseValues => {
  if (!isNaN(target) && Array.isArray(dailyExercises)) {
    return {
      targetHours: target,
      dailyExerciseHours: dailyExercises
    };
  } else {
    throw new Error('Malformatted params.');
  }
};

interface Feedback {
    days: number;
    trainedDays: number;
    target: number;
    averageHours: number;
    targetReached: boolean;
    rating: number;
    description: string;
}

const calculateExercises = (exerciseHours: Array<number>, target: number): Feedback => {
    const avg = exerciseHours.reduce((prev, sum) => prev + sum, 0) / exerciseHours.length;
    const rating = avg - target;
    return {
        days: exerciseHours.length,
        trainedDays: exerciseHours.filter(h => h > 0).length,
        target: target,
        averageHours: avg,
        targetReached: exerciseHours.every(h => h >= target),
        rating: rating,
        description: rating >= 0 ? "Well done!" : "Could be better"
    };
};


export {calculateExercises};