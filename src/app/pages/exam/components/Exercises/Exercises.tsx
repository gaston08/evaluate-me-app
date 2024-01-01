import { useEffect, useContext } from 'react';
import Exercise from '../Exercise';
import { exercises as mockedData } from '../../exercises';
import { ExercisesContext } from '../../../../contexts/Exercises';

export default function Exam() {
	const { exercises, setExercises } = useContext(ExercisesContext);

	useEffect(() => {
		setExercises(mockedData);
	}, []);

	return (
		<>
			{exercises.map((exercise) => {
				return (
					<Exercise key={exercise.id} exercise={exercise} canSelect={true} />
				);
			})}
		</>
	);
}
