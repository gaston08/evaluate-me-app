import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

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

export default function ForgotPassword() {
	const [error] = useState<string>('');
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
			onSubmit={(values, obj) => {
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
					</Box>
					<Copyright sx={{ mt: 5 }} />
				</Container>
			)}
		</Formik>
	);
}
