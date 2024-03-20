import React from 'react';
import { exerciseType } from './exercise';

export interface optionType {
	id: string;
	title: string;
}

export interface examType {
	year: number;
	type: string;
	exam_number: number;
	subject: string;
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
