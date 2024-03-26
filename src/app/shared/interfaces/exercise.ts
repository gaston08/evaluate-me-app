import React from 'react';

export interface optionType {
	id: string;
	title: string;
	feedback: string;
}

export interface exerciseType {
	id: string;
	question: Array<string>;
	options: Array<Array<optionType>>;
	correctOptions: Array<string>;
	argument: string;
	pts: string;
}

export interface contextExercises {
	exercises: Array<exerciseType>;
	setExercises: () => void;
}

export interface contextExercise {
	currentExercise: exerciseType;
	setCurrentExercise: React.Dispatch<React.SetStateAction<exerciseType>>;
}
