import { useEffect, useContext } from 'react';
import Exercise from '../Exercise';
import { exercises as mockedData } from '../../exercises';
import { ExercisesContext } from '../../../../contexts/Exercises';
import { exerciseType, contextExercises } from 'app/shared/interfaces/exercise';

export default function Exam() {
	const { exercises, setExercises } = useContext(
		ExercisesContext
	) as contextExercises;

	useEffect(() => {
		setExercises(mockedData);
	}, []);

	return (
		<>
			{exercises.map((exercise: exerciseType) => {
				return (
					<Exercise key={exercise.id} exercise={exercise} canSelect={true} />
				);
			})}
		</>
	);
}
