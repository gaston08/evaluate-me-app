import { useContext, Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExercisePlay from '../ExercisePlay';
import { exerciseType } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

export default function ExercisesPlay() {
	const { exam } = useContext<contextExam>(ExamContext);

	return (
		<Fragment>
			{exam.exercises.map((exercise: exerciseType, idx: number) => {
				return (
					<Box sx={{ width: '100%', mb: 5 }} key={exercise.id}>
						<Typography
							variant="h6"
							color="primary"
							gutterBottom
							sx={{ mt: 2 }}
							className="exercise-number"
						>
							Ejercicio {idx + 1}
						</Typography>
						<ExercisePlay idx={idx} exercise={exercise} />
					</Box>
				);
			})}
		</Fragment>
	);
}