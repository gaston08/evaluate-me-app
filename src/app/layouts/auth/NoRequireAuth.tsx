import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

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
		document.title = 'ubaparciales';
	}, []);

	return (
		<Fragment>
			<Fragment>
				{isLoading ? (
					<h1>Cargando...</h1>
				) : (
					<Container component="main" maxWidth="xs" sx={{ height: 'auto' }}>
						<CssBaseline />
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
								mt: 4,
							}}
						>
							<Outlet />
						</Box>
					</Container>
				)}
			</Fragment>
			<Helmet>
				<title>ubaparciales</title>
				<meta
					name="description"
					content="Modelos de examenes de UBA XXI y CBC"
				/>
				<meta name="keywords" content="uba xxi, cbc" />
			</Helmet>
		</Fragment>
	);
}
