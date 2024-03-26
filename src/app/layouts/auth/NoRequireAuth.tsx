import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import axios from 'axios';
import {
	cleanStorage,
	getExpireTime,
	enumTime,
	isTokenExpired,
	setToken,
} from 'app/utils/common';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export default function RequireAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const checkAuth = async () => {
		const access_token = localStorage.getItem('access_token');
		const access_token_expires_in = localStorage.getItem(
			'access_token_expires_in',
		);

		const is_token_expired = isTokenExpired(access_token_expires_in);

		if (is_token_expired | !access_token) {
			cleanStorage();
			setIsLoading(false);
			return;
		}

		axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
		const result = await axiosPost('api/refresh-token', {});

		if (result.ok) {
			const expire_time = getExpireTime(1, enumTime.HOUR);
			setToken(result.data.token, expire_time);
			navigate('/tests');
		} else {
			cleanStorage();
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkAuth().catch(console.error);
	}, []);

	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							minHeight: '100vh',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
						}}
					>
						<Outlet />
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Container>
			)}
		</>
	);
}

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Evaluate.me
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
