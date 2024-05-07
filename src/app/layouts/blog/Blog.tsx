import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import ReactGA from 'react-ga4';

ReactGA.initialize('G-R63LDGFFTW');

interface BlogProps {
	showSidebar: boolean;
	requireAuth: boolean;
}

export default function Blog(props: BlogProps) {
	const { showSidebar, requireAuth } = props;
	const { setAuth, auth } = useContext<contextAuth>(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const url = location.pathname + location.search;
		ReactGA.send({ hitType: 'pageview', page: url, title: location.pathname });
		console.log(url);
	}, [location.pathname, location.search]);

	const checkAuth = async () => {
		const access_token: string = localStorage.getItem('access_token');

		if (!access_token) {
			setAuth({
				user: null,
				isLoggedIn: false,
				isLoading: false,
			});
			if (requireAuth) {
				navigate('/auth/login');
				return;
			}
		}

		const result = await axiosPost('api/refresh-token', {});

		if (result.ok) {
			localStorage.setItem('access_token', result.data.token);
			const user = decodeToken(result.data.token) as userType;
			setAuth({
				user,
				isLoggedIn: true,
				isLoading: false,
			});
		} else {
			localStorage.removeItem('access_token');
			setAuth({
				user: null,
				isLoggedIn: false,
				isLoading: false,
			});
			if (requireAuth) {
				navigate('/auth/login');
				return;
			}
		}
	};

	useEffect(() => {
		checkAuth().catch(console.error);
	}, []);

	if (auth.isLoading) {
		return <h1>Cargando...</h1>;
	}

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
				<Header />
				<main>
					<Grid container spacing={5} sx={{ mt: 3 }}>
						<Main xs={12} md={showSidebar ? 8 : 12} />

						{showSidebar ? <Sidebar /> : null}
					</Grid>
				</main>
			</Container>
			<Footer />
		</Box>
	);
}
