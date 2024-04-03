import { useContext } from 'react';
import Box from '@mui/material/Box';
import Exercise from '../Exercise';
import { exerciseType } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

export default function Exercises() {
	const { exam, exercisesFeedback } = useContext<contextExam>(ExamContext);

	return (
		<>
			{exam.exercises.map((exercise: exerciseType, idx: number) => {
				return (
					<Box sx={{ width: '100%', mb: 5 }} key={exercise.id}>
						<Exercise
							idx={idx}
							exercise={exercise}
							isPlayView={true}
							exerciseFeedback={exercisesFeedback[idx]}
						/>
					</Box>
				);
			})}
		</>
	);
}
