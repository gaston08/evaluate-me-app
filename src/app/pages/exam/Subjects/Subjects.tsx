import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { subjects } from 'app/shared/exams/ubaxxi';
import Faq from 'app/components/Faq';
import { Helmet } from 'react-helmet-async';

export default function Subjects() {
	return (
		<Fragment>
			<Box>
				<Box sx={{ mb: 3 }}>
					<Typography variant="h5">Selecciona una materia.</Typography>
				</Box>
				<Box sx={{ minHeight: 200 }}>
					{subjects.map((subject) => {
						return (
							<Box sx={{ mb: 2 }} key={subject.value}>
								<Typography variant="h6">
									<Link component={RouterLink} to={subject.value}>
										<>{subject.short + ' '}</>
										{subject.long !== '' ? `(${subject.long})` : null}
									</Link>
								</Typography>
							</Box>
						);
					})}
				</Box>
				<Box>
					<Faq />
				</Box>
			</Box>
			<Helmet>
				<title>Examenes de UBA XXI</title>
				<meta
					name="description"
					content="Modelos de examenes de UBA XXI. Parciales de cbc y uba xxi."
				/>
				<meta name="keywords" content="uba xxi, cbc" />
				{/* social media */}
				<meta property="og:url" content="https://ubaparciales.com/tests" />
				<meta property="og:type" content="article" />
				<meta property="og:title" content="Parciales de UBA XXI" />
				<meta
					property="og:description"
					content="Practica parciales y potencia tu aprendizaje."
				/>
				<meta
					property="og:image"
					content="https://ubaparciales.com/opengraph/imgs/ipc-meta.jpg"
				/>
			</Helmet>
		</Fragment>
	);
}
