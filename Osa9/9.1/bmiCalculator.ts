const calculateBmi = (heightCm: number, weightKg: number): string => {

    try {

        if (heightCm > 0) {
            const bmi: number = weightKg / ( 0.01 * heightCm * 0.01 * heightCm )

            if(bmi < 18.5) return "Underweight"
            else if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)"
            else return "Overweight or obese"
        } else {
            throw new Error('Height was not valid!');
        }

    }catch(error: unknown) {
        let message = "Error "
        if (error instanceof Error){
            message += error
        }
        console.log(message)
    }
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

console.log(calculateBmi(height, weight))