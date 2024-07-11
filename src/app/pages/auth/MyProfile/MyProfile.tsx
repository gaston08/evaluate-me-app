import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

import AccountDetailsForm from './components/AccountDetailsForm';
import AccountInfo from './components/AccountInfo';

export default function MyProfile() {
	return (
		<Fragment>
			<Stack spacing={3}>
				<div>
					<Typography variant="h4">Perfil</Typography>
				</div>
				<Grid container spacing={3}>
					<Grid lg={4} md={6} xs={12}>
						<AccountInfo />
					</Grid>
					<Grid lg={8} md={6} xs={12}>
						<AccountDetailsForm />
					</Grid>
				</Grid>
			</Stack>
			<Helmet>
				<title>Mi perfil</title>
				<meta
					name="description"
					content="Administra tu perfil. Haz un seguimiento de tu progreso."
				/>
			</Helmet>
		</Fragment>
	);
}
