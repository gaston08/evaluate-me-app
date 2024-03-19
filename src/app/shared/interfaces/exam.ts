import React from 'react';

export interface optionType {
	id: string;
	title: string;
}

export interface exerciseType {
	id: string;
	question: string;
	options: optionType[];
	correctOptions: string[];
}

export interface examType {
	name: string;
	category: string;
	exercises: exerciseType[];
}

export interface createExam {
	exam: examType;
	setExam: () => void;
}

export interface contextExam {
	exam: examType;
	setExam: React.Dispatch<React.SetStateAction<examType>>;
}
