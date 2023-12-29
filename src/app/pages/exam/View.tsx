import { useState } from 'react';
import Exercise from './components/Exercise';
import { exercises } from './exercises';
import { ExercisesContext } from '../../contexts/Exercises';

export default function Exam() {
	const [selected, setSelected] = useState([]);

	return (
		<ExercisesContext.Provider value={{ selected, setSelected }}>
			{exercises.map((exercise) => {
				return <Exercise key={exercise.id} exercise={exercise} />;
			})}
		</ExercisesContext.Provider>
	);
}
