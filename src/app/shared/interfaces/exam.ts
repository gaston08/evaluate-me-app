import React from 'react';
import { examsUiType } from './ui';
import { SUBJECTS_ENUM } from 'app/shared/data/exam';

export interface examResultType {
	completed: boolean;
	enabled: boolean;
	selected_options: Array<{ exerciseId: string; optionId: string }>;
	options_to_select: number;
}

export interface optionType {
	id: string;
	title: string;
	feedback: string;
	code: boolean;
	python_code: boolean;
}

export interface argumentType {
	feed: string;
	likes: number;
	dislikes: number;
	text: string;
	icon: HTMLImageElement;
}

export interface questionType {
	code: boolean;
	python_code: boolean;
	text: string;
}

export interface exerciseType {
	id: string;
	question: Array<questionType | string>;
	options: Array<Array<optionType>>;
	correctOptions: Array<Array<string>>;
	argument: Array<argumentType>;
	pts: string;
}

export interface examType {
	_id?: string;
	year: number;
	type: string;
	exam_number: number;
	subject: SUBJECTS_ENUM;
	exercises: exerciseType[];
	department: string;
	totalPts: number;
}

export interface exerciseFeedback {
	error: string;
	success: string;
	html: boolean;
}

export interface contextExam {
	exam: examType;
	exams: Array<examType>;
	setExam: React.Dispatch<React.SetStateAction<examType>>;
	setExam: React.Dispatch<React.SetStateAction<Array<examType>>>;
	selectedOptions: Array<Array<Array<string>>>;
	setSelectedOptions: React.Dispatch<
		React.SetStateAction<Array<Array<Array<string>>>>
	>;
	exercisesFeedback: Array<exerciseFeedback>;
	setExercisesFeedback: React.Dispatch<
		React.SetStateAction<Array<exerciseFeedback>>
	>;
}

export interface examData {
	exam: examType;
	exercisesFeedback: Array<boolean>;
	selectedOptions: Array<Array<Array<string>>>;
	score: number;
	date: string;
	examsUi: examsUiType;
}
