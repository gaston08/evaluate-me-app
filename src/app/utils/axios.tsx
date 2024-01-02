import axios from 'axios';

interface axiosPostResponse {
	ok: boolean;
	error: string;
	errors: Array[object];
}

export const axiosPost = async (
	route: string,
	data: object | null
): axiosPostResponse => {
	const response = {};
	console.log(data);
	try {
		const result = await axios.post(
			`${import.meta.env.VITE_API_ROUTE}/${route}`,
			data
		);
		response.ok = true;
	} catch (err) {
		if (err.response) {
			if (err.response.data.message) {
				response.error = err.response.data.message;
			} else {
				response.error = err.response.statusText;
			}

			if (err.response.data.errors) {
				response.errors = err.response.data.errors;
			}
		} else if (err.request) {
			response.error = 'Can not connect to the server';
		} else {
			response.error = err.message;
		}
	}

	return response;
};
