import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import axios from 'axios';

export default function RequireAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const checkAuth = async () => {
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			navigate('/auth/login');
			return;
		}
		axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
		const result = await axiosPost('auth', {});

		if (result.ok) {
			setIsLoading(false);
		} else {
			navigate('/auth/login');
		}
	};

	useEffect(() => {
		checkAuth().catch(console.error);
	}, []);

	return <>{isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
}
