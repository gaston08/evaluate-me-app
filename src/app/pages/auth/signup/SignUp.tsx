import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { axiosPost } from '../../../utils/axios';
import { useNavigate } from 'react-router-dom';

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

export default function SignUp() {
	const [error, setError] = useState('');
	const navigate = useNavigate();

	return (
		<Formik
			initialValues={{
				email: 'gaston@gmail.com',
				password: 'abcd1234',
				confirmPassword: 'abcd1234',
				firstName: 'gaston',
				lastName: 'pedraza',
			}}
			validate={(values) => {
				const errors = {};

				if (!values.firstName) {
					errors.firstName = 'El campo es obligatorio';
				} else if (values.firstName.length < 3) {
					errors.firstName = 'El nombre debe poseer al menos 3 caracteres';
				}

				if (!values.lastName) {
					errors.lastName = 'El campo es obligatorio';
				}

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

				if (!values.confirmPassword) {
					errors.confirmPassword = 'El campo es obligatorio';
				} else if (values.password !== values.confirmPassword) {
					errors.confirmPassword = 'Las contraseñas no coinciden';
				}

				//return errors;
				return {};
			}}
			onSubmit={async (values, obj) => {
				const data = {
					email: values.email,
					password: values.password,
					confirmPassword: values.confirmPassword,
				};
				const result = await axiosPost('signup', data);
				if (result.ok) {
					navigate('/auth/login', { state: { signup: true } });
				} else {
					setError(result.error);
					if (result.errors) {
						result.errors.forEach(async (err) => {
							await obj.setFieldTouched(err.path, true);
							await obj.setFieldError(err.path, err.msg);
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
				isSubmitting,
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
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Crear usuario
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										error={errors.firstName && touched.firstName}
										helperText={errors.firstName}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.firstName}
										fullWidth
										label="Nombre"
										name="firstName"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										error={errors.lastName && touched.lastName}
										helperText={errors.lastName}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.lastName}
										fullWidth
										label="Apellido"
										name="lastName"
									/>
								</Grid>
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
									<TextField
										error={errors.confirmPassword && touched.confirmPassword}
										helperText={errors.confirmPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.confirmPassword}
										fullWidth
										label="Repetir contraseña"
										type="password"
										name="confirmPassword"
									/>
								</Grid>
								{error !== '' ? (
									<Grid item xs={12}>
										<Alert severity="error">{error}</Alert>
									</Grid>
								) : null}
								{/**<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox value="allowExtraEmails" color="primary" />
									}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>**/}
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Crear usuario
							</Button>
							<Grid container justifyContent="flex-end">
								<Grid item>
									<LinkMui variant="body" component="div">
										<Link to="/auth/login" style={{ textDecoration: 'none' }}>
											¿Ya tienes una cuenta? Inicia sesión
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
