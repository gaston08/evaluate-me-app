import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import { useNavigate } from 'react-router-dom';
import { expressError } from 'app/shared/interfaces/api-response';

export default function SignUp() {
	const [error, setError] = useState('');
	const navigate = useNavigate();

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
				confirmPassword: '',
				firstName: '',
				lastName: '',
			}}
			validate={(values) => {
				const errors = {};

				if (!values.firstName.trim()) {
					errors.firstName = 'El campo es obligatorio';
				} else if (values.firstName.trim().length < 3) {
					errors.firstName = 'El nombre debe poseer al menos 3 caracteres';
				}

				if (!values.lastName.trim()) {
					errors.lastName = 'El campo es obligatorio';
				}

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

				if (!values.confirmPassword) {
					errors.confirmPassword = 'El campo es obligatorio';
				} else if (values.password !== values.confirmPassword) {
					errors.confirmPassword = 'Las contraseñas no coinciden';
				}

				return errors;
			}}
			onSubmit={async (values, obj) => {
				const data = {
					email: values.email.trim(),
					password: values.password,
					confirmPassword: values.confirmPassword,
					firstName: values.firstName.trim(),
					lastName: values.lastName.trim(),
					role: 'user',
				};
				const result = await axiosPost('api/signup', data);
				if (result.ok) {
					navigate('/auth/login', { state: { signup: true, reset: false } });
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
				isValid,
			}) => (
				<Box
					sx={{
						marginTop: 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						{/**<LockOutlinedIcon />**/}
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
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={!isValid}
						>
							Crear usuario
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<LinkMui to="/auth/login" variant="body" component={Link}>
									¿Ya tienes una cuenta? Inicia sesión
								</LinkMui>
							</Grid>
						</Grid>
					</Box>
				</Box>
			)}
		</Formik>
	);
}
