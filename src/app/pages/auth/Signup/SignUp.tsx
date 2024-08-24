import { Fragment, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import LinkMui from '@mui/material/Link';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import { expressError } from 'app/shared/interfaces/api-response';

export default function SignUp() {
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [email, setEmail] = useState<string>('');

	return (
		<Fragment>
			{success ? (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Alert severity="success">
						<p>Te hemos enviado un email a la dirección {email}.</p>
						<p>
							Entra a la dirección proporcionada, y acuerdate de revisar la
							casilla de SPAM.
						</p>
					</Alert>
				</Box>
			) : (
				<Formik
					initialValues={{
						email: 'profesorgasti@gmail.com',
						password: 'Abcd1234',
						confirmPassword: 'Abcd1234',
						fullName: 'Gaston Pedraza',
						username: 'gaston08pedraza',
					}}
					validate={(values) => {
						const errors = {};

						if (!values.fullName.trim()) {
							errors.fullName = 'El campo es obligatorio';
						} else if (values.fullName.trim().length < 8) {
							errors.fullName = 'El nombre debe poseer al menos 8 caracteres';
						}

						if (!values.username.trim()) {
							errors.username = 'El campo es obligatorio';
						} else if (values.username.trim().length < 8) {
							errors.username = 'El usuario debe poseer al menos 8 caracteres';
						}

						if (!values.email.trim()) {
							errors.email = 'El campo es obligatorio';
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
								values.email.trim(),
							)
						) {
							errors.email = 'Dirección de correo electrónico no válida';
						}

						if (!values.password) {
							errors.password = 'El campo es obligatorio';
						} else if (values.password.length < 8) {
							errors.password =
								'La contraseña debe poseer al menos 8 caracteres';
						}

						if (!values.confirmPassword) {
							errors.confirmPassword = 'El campo es obligatorio';
						} else if (values.password !== values.confirmPassword) {
							errors.confirmPassword = 'Las contraseñas no coinciden';
						}

						return errors;
					}}
					onSubmit={async (values, obj) => {
						setLoading(true);
						const data = {
							email: values.email.trim(),
							password: values.password,
							confirmPassword: values.confirmPassword,
							fullName: values.fullName.trim(),
							username: values.username,
							role: 'user',
						};
						const result = await axiosPost('api/signup', data);
						if (result.ok) {
							setEmail(values.email);
							setSuccess(true);
							/*navigate('/auth/login', {
								state: { signup: true, reset: false },
							});*/
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
							} else {
								if (result.error.includes(values.email)) {
									obj
										.setFieldTouched('email', true)
										.then(() => {
											obj.setFieldError('email', 'Ya se encuentra en uso');
										})
										.catch(console.error);
								} else if (result.error.includes(values.username)) {
									obj
										.setFieldTouched('username', true)
										.then(() => {
											obj.setFieldError('username', 'Ya se encuentra en uso');
										})
										.catch(console.error);
								}
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
					}) => {
						return (
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
										<Grid item xs={12} md={6}>
											<TextField
												error={errors.fullName && touched.fullName}
												helperText={
													!errors.hasOwnProperty('fullName')
														? 'Por ej: Ana María Cabrera'
														: errors.fullName
												}
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.fullName}
												fullWidth
												label="Nombre completo"
												name="fullName"
											/>
										</Grid>
										<Grid item xs={12} md={6}>
											<TextField
												error={errors.username && touched.username}
												helperText={
													!errors.hasOwnProperty('username')
														? 'Por ej: ana_pibita_piola'
														: errors.username
												}
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.username}
												fullWidth
												label="Nombre de usuario"
												name="username"
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												error={errors.email && touched.email}
												helperText={
													!errors.hasOwnProperty('email')
														? 'Te enviaremos un correo de confirmación'
														: errors.email
												}
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
												error={
													errors.confirmPassword && touched.confirmPassword
												}
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
										disabled={!isValid || loading}
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
						);
					}}
				</Formik>
			)}
		</Fragment>
	);
}
