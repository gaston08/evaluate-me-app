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
		preference: {
			init_point: string;
		};
	};
	error: string | null;
	errors: Array<expressError> | null;
}

export interface apiGetResponse {
	ok: boolean;
	data: {
		exam: examType;
		result: resultType;
		user: {
			scores: Array<{
				_id: string;
				exam_subject: string;
				exam_type: string;
				date: string;
				exam_number: string;
				exam_year: number;
				score: number;
			}>;
		};
	};
	error: string | null;
	errors: Array<expressError> | null;
}

export interface apiPostGetAllExams extends apiPostResponse {
	data: {
		exams: Array<examType>;
	};
}

export interface apiGetAllSubjects extends apiGetResponse {
	data: {
		exams: Array<examType>;
	};
}

export interface apiGetAllResultsResponse extends apiGetResponse {
	data: {
		results: Array<resultType>;
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
