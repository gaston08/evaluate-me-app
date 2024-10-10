import { useEffect, useContext, useState } from 'react';
import {
	useNavigate,
	useLocation,
	Location,
	useParams,
} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import TokensMenu from './components/TokensMenu';
import Footer from './components/Footer';
import { setUpAuth } from 'app/utils/auth';
import { AuthContext } from 'app/contexts/Auth';
import { UiContext } from 'app/contexts/Ui';
import { contextAuth } from 'app/shared/interfaces/auth';
import ReactGA from 'react-ga4';
import { axiosPost } from 'app/utils/axios';
import { apiPostResponse } from 'app/shared/interfaces/api-response';
import { contextUi } from 'app/shared/interfaces/ui';
import { SUBJECTS_ENUM } from 'app/shared/data/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

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
	const { examsUi, setExamsUi } = useContext<contextUi>(UiContext);
	const { currentSubject } = useContext<contextExam>(ExamContext);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();
	const location = useLocation() as LocationState;
	const params = useParams();

	useEffect(() => {
		if (location.pathname.includes('/tests/')) {
			setExamsUi((prev) => {
				return {
					...prev,
					isTrainer: false,
					isTest: true,
				};
			});
		} else if (
			location.pathname.includes('/entrenamiento/') &&
			params.department !== undefined
		) {
			setExamsUi((prev) => {
				return {
					...prev,
					isTrainer: true,
					isTest: false,
				};
			});
		} else {
			setExamsUi((prev) => {
				return {
					...prev,
					isTrainer: false,
					isTest: false,
				};
			});
		}
	}, [location.pathname]);

	useEffect(() => {
		if (currentSubject !== null) {
			const body = document.querySelector('body');
			if (
				currentSubject.value === SUBJECTS_ENUM.PENSAMIENTO_COMPUTACIONAL &&
				(examsUi.isTrainer || examsUi.isTest)
			) {
				body.classList.add('body-code');
			} else {
				body.classList.remove('body-code');
			}
		}
	}, [examsUi, currentSubject]);

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

	useEffect(() => {
		if (auth.user !== null) {
			const update_ip = localStorage.getItem('upt_ip');
			if (update_ip !== 'true') {
				axiosPost('api/user/update/ip')
					.then((result: apiPostResponse) => {
						if (result.ok) {
							localStorage.setItem('upt_ip', 'true');
							console.log('ok uipa');
						} else {
							console.log(result.error);
							console.log(result.errors);
						}
					})
					.catch(console.error);
			}
		}
	}, [auth]);

	const checkAuth = (): void => {
		console.log('check auth');
		const access_token: string = localStorage.getItem('access_token');

		if (!access_token) {
			setUpAuth('', false, setAuth);
			if (requireAuth) {
				navigate(`/auth/login?redirect=${location.pathname}`, {
					state: { omitAuth: true },
				});
				return;
			} else {
				setLoading(false);
			}
		} else {
			setUpAuth(access_token, true, setAuth);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (location.state?.omitAuth) {
			setLoading(false);
			console.log('OMIT');
			// omit auth
		} else {
			checkAuth();
		}
	}, [location.pathname]);

	if (loading) {
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
				{showTokens && auth.isLoggedIn ? (
					<TokensMenu coffees={auth.coffees} />
				) : null}
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
