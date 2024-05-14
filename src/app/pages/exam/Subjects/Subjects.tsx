import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { subjects } from 'app/shared/exams/ubaxxi';
import Faq from 'app/components/Faq';

export default function Subjects() {
	return (
		<Box>
			<Box sx={{ mb: 3 }}>
				<Typography variant="h5">Selecciona una materia.</Typography>
			</Box>
			<Box sx={{ minHeight: 150 }}>
				{subjects.map((subject) => {
					return (
						<Box sx={{ mb: 2 }} key={subject.value}>
							<Typography variant="h6">
								<Link component={RouterLink} to={subject.value}>
									{subject.short} ({subject.long})
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
	);
}
