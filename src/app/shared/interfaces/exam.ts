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
	correctOptions: Array<Array<string>>;
	argument: string;
	pts: string;
}

export interface examType {
	_id?: string;
	year: number;
	type: string;
	exam_number: number;
	subject: string;
	exercises: exerciseType[];
}

export interface exerciseFeedback {
	error: string;
	success: string;
}

export interface contextExam {
	exam: examType;
	setExam: React.Dispatch<React.SetStateAction<examType>>;
	selectedOptions: Array<Array<Array<string>>>;
	setSelectedOptions: React.Dispatch<
		React.SetStateAction<Array<Array<Array<string>>>>
	>;
	exercisesFeedback: Array<exerciseFeedback>;
	setExercisesFeedback: React.Dispatch<
		React.SetStateAction<Array<exerciseFeedback>>
	>;
}
