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
	data: object;
	error: string | null;
	errors: Array<expressError> | null;
}
