import React from 'react';

interface optionType {
	id: string;
	title: string;
}

export interface exerciseType {
	id: string;
	question: string;
	options: Array<optionType>;
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
}

export interface contextExercise {
	currentExercise: exerciseType;
	setCurrentExercise: React.Dispatch<React.SetStateAction<exerciseType>>;
}
