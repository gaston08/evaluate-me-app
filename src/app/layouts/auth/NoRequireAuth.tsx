import { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { setUpAuth } from 'app/utils/auth';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth } from 'app/shared/interfaces/auth';

interface LocationState {
	state?: {
		signup: boolean;
	};
	pathname: string;
}

export default function RequireAuth() {
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation() as LocationState;
	const navigate = useNavigate();
	const { setAuth } = useContext<contextAuth>(AuthContext);

	useEffect(() => {
		const body = document.querySelector('body');
		if (
			location.pathname.includes(
				'/entrenamiento/pensamiento-computacional-(90)/',
			)
		) {
			body.classList.add('body-code');
		} else {
			body.classList.remove('body-code');
		}
	}, [location.pathname, location.search]);

	const checkAuth = (): void => {
		const access_token = localStorage.getItem('access_token');

		if (!access_token) {
			setUpAuth('', false, setAuth);
			setIsLoading(false);
			return;
		} else {
			setUpAuth(access_token, true, setAuth);
			navigate('/tests', { state: { omitAuth: true } });
		}
		/*const result = await axiosPost('api/refresh-token', {});

		if (result.ok) {
			setUpAuth(result.data.token, true, setAuth);
			navigate('/tests', { state: { omitAuth: true } });
		} else {
			setUpAuth('', false, setAuth);
			setIsLoading(false);
		}*/
	};

	useEffect(() => {
		if (location.state?.omitAuth) {
			setIsLoading(false);
			// omit auth
		} else {
			checkAuth();
		}
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
