import { useState } from 'react';
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

interface InfoCoffeesUser {
	before_coffees: number;
	after_coffees: number;
	email: string;
}

export default function UpdateUserCoffees() {
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [info, setInfo] = useState<InfoCoffeesUser>({});

	return (
		<Formik
			initialValues={{
				email: '',
				username: '',
				coffees: 0,
			}}
			validate={(values) => {
				const errors = {};

				if (values.coffees.length === 0) {
					errors.coffees = 'Campo obligatorio';
				}

				return errors;
			}}
			onSubmit={async (values, obj) => {
				setLoading(true);

				const data = {
					coffees: Number(values.coffees),
				};

				if (values.email !== '') {
					data.email = values.email;
				} else if (values.username !== '') {
					data.username = values.username;
				}

				const result: apiPostResponse = await axiosPost(
					'api/admin/user/update/coffees',
					data,
				);
				if (result.ok) {
					setInfo({
						before_coffees: result.data.before_coffees,
						after_coffees: result.data.after_coffees,
						email: result.data.user.email,
					});
					setLoading(false);
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
					<>
						<Typography component="h1" variant="h5">
							Envia cafecitos
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
										error={errors.username && touched.username}
										helperText={errors.username}
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
										error={errors.coffees && touched.coffees}
										helperText={errors.coffees}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.coffees}
										fullWidth
										label="Cafecitos"
										name="coffees"
										required
									/>
								</Grid>
								{error !== '' ? (
									<Grid item xs={12}>
										<Alert severity="error">{error}</Alert>
									</Grid>
								) : null}
							</Grid>
							<Grid container spacing={2} justifyContent="flex-start">
								<Grid item>
									<Button
										type="submit"
										variant="contained"
										sx={{ mt: 3, mb: 2 }}
										disabled={loading}
									>
										ENVIAR
									</Button>
								</Grid>
							</Grid>
							<Grid container spacing={2} justifyContent="flex-start">
								<Grid item>
									<Typography>{info.email}</Typography>
									<Typography>{info.before_coffees}</Typography>
									<Typography>{info.after_coffees}</Typography>
								</Grid>
							</Grid>
						</Box>
					</>
				</Box>
			)}
		</Formik>
	);
}
