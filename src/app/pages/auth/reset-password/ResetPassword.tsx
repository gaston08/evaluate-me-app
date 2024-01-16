import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import { axiosPost } from 'app/utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { expressError } from 'app/shared/interfaces/api-response';

export default function ResetPassword() {
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const params = useParams();

	const token: string = params.token;

	return (
		<Formik
			initialValues={{
				password: 'abcd1234',
				confirmPassword: 'abcd1234',
			}}
			validate={(values) => {
				const errors = {};

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
				setLoading(true);
				const data = {
					password: values.password,
					confirmPassword: values.confirmPassword,
				};
				const result = await axiosPost(
					`api/user/reset/password/${token}`,
					data,
				);
				if (result.ok) {
					navigate('/auth/login', { state: { signup: false, reset: true } });
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
				setLoading(false);
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
					<Typography component="h1" variant="h5">
						Ingresa tu nueva contraseña
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
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
							disabled={!!(!isValid | loading)}
						>
							Cambiar contraseña
						</Button>
					</Box>
				</Box>
			)}
		</Formik>
	);
}
