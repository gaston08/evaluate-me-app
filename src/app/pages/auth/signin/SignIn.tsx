import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Formik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosPost } from '../../../utils/axios';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { RouteComponentProps } from 'react-router';

interface UserPageProps extends RouteComponentProps {
	state: {
		signup?: boolean | undefined;
	};
}

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Evaluate.me
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

export default function SignIn() {
	const location: UserPageProps = useLocation();
	const [error, setError] = useState<string>('');
	const navigate = useNavigate();
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				rememberLogin: true,
			}}
			validate={(values) => {
				const errors = {};

				if (!values.email) {
					errors.email = 'El campo es obligatorio';
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
				const data = {
					email: values.email,
					password: values.password,
				};

				const result: apiPostResponse = await axiosPost('login', data);
				if (result.ok) {
					if (values.rememberLogin) {
						localStorage.setItem('access_token', result.data.token);
					}
					navigate('/blog/exam');
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
				setFieldValue,
			}) => (
				<Container component="main" maxWidth="xs">
					<CssBaseline />
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
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								{location.state.signup ? (
									<Grid item xs={12}>
										<Alert severity="success">
											<AlertTitle>Correcto</AlertTitle>
											Usuario creado con éxito.{' '}
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
								<Grid item xs={12}>
									<FormControlLabel
										control={
											<Checkbox
												color="primary"
												checked={values.rememberLogin}
											/>
										}
										label="Recordar inicio de sesión"
										onChange={(val): void =>
											setFieldValue('rememberLogin', val.target.checked)
										}
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
											to="/auth/forgot-password"
											style={{ textDecoration: 'none' }}
										>
											¿Olvidaste tu contraseña?
										</Link>
									</LinkMui>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Copyright sx={{ mt: 5 }} />
				</Container>
			)}
		</Formik>
	);
}
