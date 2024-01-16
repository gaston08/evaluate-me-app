import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Formik } from 'formik';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { axiosPost } from 'app/utils/axios';

export default function ForgotPassword() {
	const [error, setError] = useState<string>('');
	const [emailSended] = useState<boolean>(false);
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
				const data = {
					email: values.email,
				};

				//return setEmailSended(true);

				const result: apiPostResponse = await axiosPost(
					'api/forgot-password',
					data,
				);
				if (result.ok) {
					// here
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
											Ingrese su correo electrónico o número de teléfono móvil
											para buscar su cuenta.
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
										<Button variant="outlined" sx={{ mt: 3, mb: 2 }}>
											Cancelar
										</Button>
									</Grid>
									<Grid item>
										<Button
											type="submit"
											variant="contained"
											sx={{ mt: 3, mb: 2 }}
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
			Se ha enviado un email a tu dirección de correo electrónico: {email}
		</Alert>
	);
}
