import { useContext } from 'react';
import Exercise from '../Exercise';
import { exerciseType } from 'app/shared/interfaces/exercise';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

export default function Exam() {
	const { exam } = useContext<contextExam>(ExamContext);

	return (
		<>
			{exam.exercises.map((exercise: exerciseType) => {
				return (
					<Exercise key={exercise.id} exercise={exercise} canSelect={true} />
				);
			})}
		</>
	);
}
