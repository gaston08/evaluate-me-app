import { createContext } from 'react';
import { contextExercises } from 'app/shared/interfaces/exercise';

export const ExercisesContext = createContext<contextExercises | null>({
	selected: [],
	exercises: [],
	setSelected: () => {},
	setExercises: () => {},
});
