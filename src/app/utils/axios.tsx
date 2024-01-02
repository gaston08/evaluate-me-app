import axios from 'axios';

export const axiosPost = async (route, data) => {
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
		} else if (err.request) {
			response.error = 'Can not connect to the server';
		} else {
			response.error = err.message;
		}
	}

	return response;
};
