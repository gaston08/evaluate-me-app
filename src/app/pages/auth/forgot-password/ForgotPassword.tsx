import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Formik } from 'formik';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { axiosPost } from 'app/utils/axios';
import { Link as RouterLink } from 'react-router-dom';

export default function ForgotPassword() {
	const [error, setError] = useState<string>('');
	const [emailSended, setEmailSended] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	return (
		<Formik
			initialValues={{
				email: '',
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

				return errors;
			}}
			onSubmit={async (values, obj) => {
				setLoading(true);
				const data = {
					email: values.email,
				};

				const result: apiPostResponse = await axiosPost(
					'api/user/forgot/password',
					data,
				);
				if (result.ok) {
					setEmailSended(true);
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
			}) => (
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{emailSended ? (
						<EmailSended email={values.email} />
					) : (
						<>
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								{/**<LockOutlinedIcon />**/}
							</Avatar>
							<Typography component="h1" variant="h5">
								Busca tu cuenta
							</Typography>
							<Box
								component="form"
								noValidate
								onSubmit={handleSubmit}
								sx={{ mt: 3 }}
							>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Typography component="h3" variant="h6">
											Ingresá tu correo electrónico para buscar tu cuenta.
										</Typography>
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
									{error !== '' ? (
										<Grid item xs={12}>
											<Alert severity="error">{error}</Alert>
										</Grid>
									) : null}
								</Grid>
								<Grid container spacing={2} justifyContent="flex-end">
									<Grid item>
										<Button
											component={RouterLink}
											to="/auth/login"
											variant="outlined"
											sx={{ mt: 3, mb: 2 }}
											disabled={loading}
										>
											Cancelar
										</Button>
									</Grid>
									<Grid item>
										<Button
											type="submit"
											variant="contained"
											sx={{ mt: 3, mb: 2 }}
											disabled={loading}
										>
											Buscar
										</Button>
									</Grid>
								</Grid>
							</Box>
						</>
					)}
				</Box>
			)}
		</Formik>
	);
}

interface IEmailSended {
	email: string;
}

function EmailSended(props: IEmailSended) {
	const { email } = props;
	return (
		<Alert severity="success">
			<AlertTitle>Email enviado con éxito!</AlertTitle>
			Se ha enviado un email a tu dirección de correo electrónico: {email}.
			Sigue las instrucciones detalladas en el email para recuperar tu cuenta.
		</Alert>
	);
}
