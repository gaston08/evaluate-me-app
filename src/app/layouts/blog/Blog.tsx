import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const sidebar = {
	title: 'About',
	description:
		'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
	archives: [
		{ title: 'IPC', url: '/tests/pensamiento-cientifico' },
		{ title: 'ICSE', url: '/tests/sociedad-y-estado' },
	],
};

export default function Blog() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				minHeight: '100vh',
			}}
		>
			<Container maxWidth="lg">
				<Header title="Blog" />
				<main>
					<Grid container spacing={5} sx={{ mt: 3 }}>
						<Main />
						<Sidebar
							title={'Parciales.'}
							description={
								'Muy pronto estarán disponibles los exámenes de otras materias.'
							}
							archives={sidebar.archives}
						/>
					</Grid>
				</main>
			</Container>
			<Footer title="evaluate.me" description="" />
		</Box>
	);
}
