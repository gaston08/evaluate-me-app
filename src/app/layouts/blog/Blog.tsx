import { useEffect, useContext } from 'react';
import { decodeToken } from 'react-jwt';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { axiosPost } from 'app/utils/axios';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth, userType } from 'app/shared/interfaces/auth';

export default function Blog() {
	const { setAuth } = useContext<contextAuth>(AuthContext);

	const checkAuth = async () => {
		const access_token: string = localStorage.getItem('access_token');

		if (!access_token) {
			setAuth({
				user: null,
				isLoggedIn: false,
			});
			return;
		}

		const result = await axiosPost('api/refresh-token', {});

		if (result.ok) {
			localStorage.setItem('access_token', result.data.token);
			const user = decodeToken(result.data.token) as userType;
			setAuth({
				user,
				isLoggedIn: true,
			});
		} else {
			localStorage.removeItem('access_token');
			setAuth({
				user: null,
				isLoggedIn: false,
			});
		}
	};

	useEffect(() => {
		checkAuth().catch(console.error);
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				minHeight: '100vh',
			}}
		>
			<Container maxWidth="lg">
				<Header title="Blog" />
				<main>
					<Grid container spacing={5} sx={{ mt: 3 }}>
						<Main />
						<Sidebar
							title={'Parciales.'}
							description={
								'Muy pronto estarán disponibles los exámenes de otras materias.'
							}
						/>
					</Grid>
				</main>
			</Container>
			<Footer title="evaluate.me" description="" />
		</Box>
	);
}
