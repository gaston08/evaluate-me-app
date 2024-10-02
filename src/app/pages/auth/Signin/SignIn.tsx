import { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Formik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { GoogleLogin } from '@react-oauth/google';
import { setUpAuth } from 'app/utils/auth';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth } from 'app/shared/interfaces/auth';

interface LocationState {
	state?: {
		signup: boolean;
	};
}

export default function SignIn() {
	const { setAuth } = useContext<contextAuth>(AuthContext);
	const location = useLocation() as LocationState;
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const [redirect] = useState<string>(() => {
		const param = searchParams.get('redirect');
		if (param === null) {
			return '/tests';
		} else {
			return param;
		}
	});

	const loginWithGoogle = async (token: string, clientId: string) => {
		setLoading(true);

		const data = {
			token,
			clientId,
		};

		const invitation_code = localStorage.getItem('invitation_code');
		if (typeof invitation_code === 'string') {
			data.invitation_code = invitation_code;
		}

		const result: apiPostResponse = await axiosPost(
			'api/user/login-google',
			data,
		);

		if (result.ok) {
			setUpAuth(result.data.token, true, setAuth);
			navigate(redirect, { state: { omitAuth: true } });
		} else {
			if (result.error) {
				setError(result.error);
			}
		}

		setLoading(false);
	};
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validate={(values) => {
				const errors = {};

				if (!values.email.trim()) {
					errors.email = 'El campo es obligatorio';
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())
				) {
					errors.email = 'Dirección de correo electrónico no válida';
				}

				if (!values.password) {
					errors.password = 'El campo es obligatorio';
				} else if (values.password.length < 8) {
					errors.password = 'La contraseña debe poseer al menos 8 caracteres';
				}

				return errors;
			}}
			onSubmit={async (values, obj) => {
				setLoading(true);
				const data = {
					email: values.email.trim(),
					password: values.password,
				};

				const result: apiPostResponse = await axiosPost('api/user/login', data);
				if (result.ok) {
					if (result.data.active === true) {
						setUpAuth(result.data.token, true, setAuth);
						navigate(redirect, { state: { omitAuth: true } });
					} else {
						setError(
							'Debes activar tu cuenta para seguir. Te enviamos un email a tu dirección de correo electrónico.',
						);
						console.log('require login');
					}
				} else {
					setError(result.error);
					if (result.errors) {
						result.errors.forEach((err: expressError): void => {
							obj
								.setFieldTouched(err.path, true)
								.then(() => {
									obj.setFieldError(err.path, err.msg);
								})
								.catch(console.error);
						});
					}
				}
				setLoading(false);
				obj.setSubmitting(false);
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isValid,
			}) => (
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						{/**<LockOutlinedIcon />**/}
					</Avatar>
					<Typography component="h1" variant="h5">
						Inicio de sesión
					</Typography>
					<Box sx={{ mt: 2 }}>
						<GoogleLogin
							onSuccess={(credentialResponse) => {
								loginWithGoogle(
									credentialResponse.credential,
									credentialResponse.clientId,
								).catch(console.error);
							}}
							onError={() => {
								console.log('Login Failed');
							}}
						/>
					</Box>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							{location.state?.signup ? (
								<Grid item xs={12}>
									<Alert severity="success">
										<AlertTitle>Correcto</AlertTitle>
										Usuario creado con éxito.{' '}
										<strong>Ahora puedes iniciar sesión.</strong>
									</Alert>
								</Grid>
							) : null}

							{location.state?.reset ? (
								<Grid item xs={12}>
									<Alert severity="success">
										<AlertTitle>Correcto</AlertTitle>
										Se ha cambiado la contraseña.{' '}
										<strong>Ahora puedes iniciar sesión.</strong>
									</Alert>
								</Grid>
							) : null}

							<Grid item xs={12}>
								<TextField
									error={errors.email && touched.email}
									helperText={errors.email}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									fullWidth
									label="Correo electrónico"
									name="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									error={errors.password && touched.password}
									helperText={errors.password}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									fullWidth
									label="Contraseña"
									type="password"
									name="password"
								/>
							</Grid>
							{error !== '' ? (
								<Grid item xs={12}>
									<Alert severity="error">{error}</Alert>
								</Grid>
							) : null}
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={!isValid || loading}
						>
							Iniciar sesión
						</Button>
						<Grid container justifyContent="flex-start">
							<Grid item>
								<LinkMui variant="body" component="div">
									<Link to="/auth/signup" style={{ textDecoration: 'none' }}>
										¿No tienes una cuenta? Create una
									</Link>
								</LinkMui>
							</Grid>
							<Grid item>
								<LinkMui variant="body" component="div">
									<Link
										to="/auth/forgot/password"
										style={{ textDecoration: 'none' }}
									>
										¿Olvidaste tu contraseña?
									</Link>
								</LinkMui>
							</Grid>
						</Grid>
					</Box>
				</Box>
			)}
		</Formik>
	);
}
