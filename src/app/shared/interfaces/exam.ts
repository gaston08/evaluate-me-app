export interface optionType {
	id: string;
	title: string;
}

export interface correctOptionsType {
	optionId: string;
	text: string;
}

export interface exerciseType {
	question: string;
	options: optionType[];
	correctOptions: correctOptionsType[];
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
