import { Dispatch } from 'react';
import { userType } from 'app/shared/interfaces/auth';
import { decodeToken } from 'react-jwt';
import axios from 'axios';

export const setUpAuth = (
	token: string,
	isLoggedIn: boolean,
	setAuth: Dispatch<SetStateAction<authType>>,
) => {
	if (isLoggedIn) {
		localStorage.setItem('access_token', token);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		const user = decodeToken(token) as userType;
		setAuth({
			user,
			isLoggedIn: true,
			isLoading: false,
			coffees: user.coffees,
		});
	} else {
		localStorage.removeItem('access_token');
		setAuth({
			user: null,
			isLoggedIn: false,
			isLoading: false,
			coffees: 0,
		});
	}
};
