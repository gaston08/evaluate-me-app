import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import TokensMenu from './components/TokensMenu';
import Footer from './components/Footer';
import { axiosPost } from 'app/utils/axios';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth, userType } from 'app/shared/interfaces/auth';
import ReactGA from 'react-ga4';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import axios from 'axios';

interface BlogProps {
	showSidebar: boolean;
	showTokens: boolean;
	requireAuth: boolean;
}

export default function Blog(props: BlogProps) {
	const { showSidebar, requireAuth, showTokens } = props;
	const { setAuth, auth } = useContext<contextAuth>(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (requireAuth && auth.user) {
			if (auth.coffees % 10 === 0) {
				axiosPost('api/user/update/profile', {
					fullName: auth.user.fullName,
					username: auth.user.username,
					email: auth.user.email,
					coffees: auth.coffees,
				})
					.then((result: apiPostResponse) => {
						if (result.ok) {
							localStorage.setItem('access_token', result.data.token);
							axios.defaults.headers.common['Authorization'] =
								`Bearer ${result.data.token}`;
						} else {
							if (result.error) {
								console.log(result.error);
							}
							if (result.errors) {
								result.errors.forEach((err: expressError): void => {
									console.log(err.msg);
								});
							}
						}
					})
					.catch(console.error);
			}
		}
	}, [auth.coffees]);

	useEffect(() => {
		if (import.meta.env.MODE !== 'development') {
			const url = location.pathname + location.search;
			ReactGA.send({
				hitType: 'pageview',
				page: url,
				title: location.pathname,
			});
		}
	}, [location.pathname, location.search]);

	const checkAuth = async () => {
		const access_token: string = localStorage.getItem('access_token');

		if (!access_token) {
			setAuth({
				user: null,
				isLoggedIn: false,
				isLoading: false,
				coffees: 0,
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
				{showTokens ? <TokensMenu coffees={auth.coffees} /> : null}
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
