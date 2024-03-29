import { examType } from './exam';

export interface expressError {
	type: string;
	msg: string;
	path: string;
	location: string;
}

export interface apiPostResponse {
	ok: boolean;
	data: {
		token?: string;
	};
	error: string | null;
	errors: Array<expressError> | null;
}

export interface apiGetResponse {
	ok: boolean;
	data: {
		exam: examType;
		results: resultType;
	};
	error: string | null;
	errors: Array<expressError> | null;
}

export interface apiGetAllSubjects extends apiGetResponse {
	data: {
		exams: Array<examType>;
	};
}

export interface resultType {
	_id: string;
	answers: Array<Array<Array<string>>>;
	createdAt: string;
	date: string;
	examId: examType;
	exam_number: number;
	exam_subject: string;
	exam_type: string;
	exam_year: number;
	score: string;
	userId: string;
}
