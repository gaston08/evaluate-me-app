export interface exerciseType {
	id: string;
	question: string;
	options: Array<optionType>;
}

interface optionType {
	id: string;
	title: string;
}

export interface selectedInterface {
	optionId: string;
	exerciseId;
}

export interface contextExercises {
	selected: Array<selectedInterface>;
	setSelected: () => void;
	exercises: Array<exerciseType>;
	setExercises: () => void;
	currentExercise: currentExercise;
	setCurrentExercise: () => void;
}
