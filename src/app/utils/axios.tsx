import axios from 'axios';

import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';

interface axiosPostInterface {
	data?: object;
}

interface axiosPostErrorInterface {
	response?: {
		data: {
			message?: string;
			errors?: Array<expressError>;
			error?: string;
		};
		statusText: string;
	};
	request?: object;
	message: string;
}

export const axiosPost = async (
	route: string,
	data: object | null,
): Promise<apiPostResponse> => {
	const response: apiPostResponse = {};
	try {
		const result: axiosPostInterface = await axios.post(
			`${import.meta.env.VITE_API_ROUTE}/${route}`,
			data,
		);
		response.ok = true;
		if (result.data) {
			response.data = result.data;
		}
	} catch (error) {
		response.ok = false;
		const err: axiosPostErrorInterface = error as axiosPostErrorInterface;
		if (err.response) {
			if (err.response.data.error) {
				response.error = err.response.data.error;
			} else {
				response.error = err.response.statusText;
			}

			if (err.response.data.errors) {
				response.errors = err.response.data.errors;
			}
		} else if (err.request) {
			response.error = 'No se pudo conectar con el servidor.';
		} else {
			response.error = err.message;
		}
	}

	return response;
};
