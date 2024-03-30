import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export default function RequireAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const checkAuth = async () => {
		const access_token = localStorage.getItem('access_token');

		if (!access_token) {
			localStorage.removeItem('access_token');
			setIsLoading(false);
			return;
		}
		const result = await axiosPost('api/refresh-token', {});

		if (result.ok) {
			localStorage.setItem('access_token', result.data.token);
			navigate('/tests');
		} else {
			localStorage.removeItem('access_token');
			setIsLoading(false);
		}
	};

	useEffect(() => {
		checkAuth().catch(console.error);
	}, []);

	return (
		<>
			{isLoading ? (
				<h1>Cargando...</h1>
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
					</Box>
				</Container>
			)}
		</>
	);
}
