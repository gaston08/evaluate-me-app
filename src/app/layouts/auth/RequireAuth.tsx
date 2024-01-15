import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import {
	cleanStorage,
	getExpireTime,
	enumTime,
	isTokenExpired,
	setToken,
} from 'app/utils/common';
import axios from 'axios';

export default function RequireAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const checkAuth = async () => {
		const access_token_expires_in: number = Number(
			localStorage.getItem('access_token_expires_in'),
		);
		const access_token: string = localStorage.getItem('access_token');

		const is_token_expired = isTokenExpired(access_token_expires_in);

		if (!access_token | is_token_expired) {
			cleanStorage();
			navigate('/auth/login');
			return;
		}

		axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
		const result = await axiosPost('api/refresh-token', {});

		if (result.ok) {
			const expire_time = getExpireTime(1, enumTime.HOUR);
			setToken(result.data.token, expire_time);
			setIsLoading(false);
		} else {
			cleanStorage();
			navigate('/auth/login');
		}
	};

	useEffect(() => {
		checkAuth().catch(console.error);
	}, []);

	return <>{isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
}
