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

export interface contextExam {
	exam: examType;
	setExam: React.Dispatch<React.SetStateAction<examType>>;
	exercises: Array<exerciseType>;
	setExercises: React.Dispatch<React.SetStateAction<Array<exerciseType>>>;
	selectedOptions: Array<Array<Array<string>>>;
	setSelectedOptions: React.Dispatch<
		React.SetStateAction<Array<Array<Array<string>>>>
	>;
}
