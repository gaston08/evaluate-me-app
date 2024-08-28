import { useEffect, useContext } from 'react';
import { useNavigate, useLocation, Location } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import TokensMenu from './components/TokensMenu';
import Footer from './components/Footer';
import { axiosPost } from 'app/utils/axios';
import { setUpAuth } from 'app/utils/auth';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth } from 'app/shared/interfaces/auth';
import ReactGA from 'react-ga4';

interface LocationState extends Location {
	state?: {
		signup: boolean;
	};
}

interface BlogProps {
	showSidebar: boolean;
	showTokens: boolean;
	requireAuth: boolean;
}

export default function Blog(props: BlogProps) {
	const { showSidebar, requireAuth, showTokens } = props;
	const { setAuth, auth } = useContext<contextAuth>(AuthContext);
	const navigate = useNavigate();
	const location = useLocation() as LocationState;

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
		console.log('check auth');
		const access_token: string = localStorage.getItem('access_token');

		if (!access_token) {
			setUpAuth('', false, setAuth);
			if (requireAuth) {
				navigate('/auth/login', { state: { omitAuth: true } });
				return;
			}
		}

		const result = await axiosPost('api/refresh-token', {});

		if (result.ok) {
			setUpAuth(result.data.token, true, setAuth);
		} else {
			setUpAuth('', false, setAuth);

			if (requireAuth) {
				navigate('/auth/login', { state: { omitAuth: true } });
				return;
			}
		}
	};

	useEffect(() => {
		if (location.state?.omitAuth) {
			// omit auth
		} else {
			checkAuth().catch(console.error);
		}
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
