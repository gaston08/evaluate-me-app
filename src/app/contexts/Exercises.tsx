import { createContext } from 'react';
import { contextExercises } from 'app/shared/interfaces/exercise';

export const ExercisesContext = createContext<contextExercises | null>({
	exercises: [],
	setExercises: () => {},
	selectedOptions: [],
	setSelectedOptions: () => {},
});
