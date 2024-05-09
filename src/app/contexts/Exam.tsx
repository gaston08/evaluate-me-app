import { createContext } from 'react';
import { contextExam } from 'app/shared/interfaces/exam';

export const ExamContext = createContext<contextExam>({
	exam: {},
	setExam: () => {},
	selectedOptions: [],
	setSelectedOptions: () => {},
	exercisesFeedback: [],
	setExercisesFeedback: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const defaultCurrentExam = {
	year: '',
	subject: '',
	exercises: [],
	type: '',
	exam_number: '',
	department: '',
};
