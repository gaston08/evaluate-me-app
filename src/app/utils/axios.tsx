import axios from 'axios';

import {
	apiPostResponse,
	apiGetResponse,
	expressError,
} from 'app/shared/interfaces/api-response';

interface axiosPostInterface {
	data?: object;
}

interface axiosGetInterface {
	data: object;
}

interface axiosErrorInterface {
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

let API_ROUTE: string;

if (import.meta.env.MODE === 'development') {
	console.log('working on development mode');
	API_ROUTE = import.meta.env.VITE_API_ROUTE_DEV as string;
} else {
	console.log('working on production mode');
	API_ROUTE = import.meta.env.VITE_API_ROUTE as string;
}
console.log(API_ROUTE);

export const axiosPost = async (
	route: string,
	data: object | null,
): Promise<apiPostResponse> => {
	const response: apiPostResponse = {};
	try {
		const result: axiosPostInterface = await axios.post(
			`${API_ROUTE}/${route}`,
			data,
		);
		response.ok = true;
		if (result.data) {
			response.data = result.data;
		}
	} catch (error) {
		response.ok = false;
		const err: axiosErrorInterface = error as axiosErrorInterface;
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

export const axiosGet = async (route: string): Promise<apiGetResponse> => {
	const response: apiGetResponse = {};
	try {
		const result: axiosGetInterface = await axios.get(`${API_ROUTE}/${route}`);
		response.ok = true;
		response.data = result.data;
	} catch (error) {
		response.ok = false;
		const err: axiosErrorInterface = error as axiosErrorInterface;
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
