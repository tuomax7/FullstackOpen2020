const calculateBmi = (heightCm: number, weightKg: number): string => {

    try {

        if (heightCm > 0) {
            const bmi: number = weightKg / ( 0.01 * heightCm * 0.01 * heightCm );

            if(bmi < 18.5) return "Underweight";
            else if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)";
            else return "Overweight or obese";
        } else {
            throw new Error('Height was not valid!');
        }

    }catch(error: unknown) {
        let message = "Error ";
        if (error instanceof Error){
            message += error;
        }
        console.log(message);
        return "Was not able to calculate BMI";
    }
};

export {calculateBmi};