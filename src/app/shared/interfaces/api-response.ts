import { examType } from './exam';
import { userType } from './auth';

export interface expressError {
	type: string;
	msg: string;
	path: string;
	location: string;
}

export interface examsListInterface {
	primer_parcial: Array<examTypeInterface>;
	segundo_parcial: Array<examTypeInterface>;
	recuperatorio_primer_parcial: Array<examTypeInterface>;
	recuperatorio_segundo_parcial: Array<examTypeInterface>;
	final: Array<examTypeInterface>;
}

export interface apiPostResponse {
	ok: boolean;
	data: {
		token?: string;
		preference: {
			init_point: string;
		};
		user: userType;
		before_coffees: number;
		after_coffees: number;
	};
	error: string | null;
	errors: Array<expressError> | null;
}

export interface apiGetResponse {
	ok: boolean;
	data: {
		exam: examType;
		examsList: examsListInterface;
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
		examsList: examsListInterface;
	};
}

export interface apiGetAllTrainer extends apiGetResponse {
	data: {
		exams: Array<examType>;
	};
}
