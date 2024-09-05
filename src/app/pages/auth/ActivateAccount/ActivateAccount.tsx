import { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { axiosPost } from 'app/utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth } from 'app/shared/interfaces/auth';
import { setUpAuth } from 'app/utils/auth';

export default function ResetPassword() {
	const { setAuth } = useContext<contextAuth>(AuthContext);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const params = useParams();

	const token: string = params.token;

	useEffect(() => {
		callApi().catch(console.error);
	}, []);

	async function callApi() {
		setLoading(true);
		const invitation_code = localStorage.getItem('invitation_code');
		let result;
		if (typeof invitation_code === 'string') {
			result = await axiosPost(`api/user/activate/account/${token}`, {
				invitation_code,
			});
		} else {
			result = await axiosPost(`api/user/activate/account/${token}`);
		}
		if (result.ok) {
			//navigate('/auth/login', { state: { signup: true, reset: false } });

			setUpAuth(result.data.token, true, setAuth);
			navigate('/tests', { state: { omitAuth: true } });
		} else {
			setLoading(false);
		}
	}

	return (
		<Box sx={{ display: 'flex' }}>
			{loading ? (
				<CircularProgress />
			) : (
				<Alert severity="error">
					No se pudo activar tu cuenta, comunicate con el equipo{' '}
					<strong>ubaparciales@gmail.com</strong>
				</Alert>
			)}
		</Box>
	);
}
