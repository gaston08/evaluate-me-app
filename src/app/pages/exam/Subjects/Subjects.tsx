import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { subjects } from 'app/shared/data/exam';

export default function Subjects() {
	return (
		<Box>
			<Box sx={{ mb: 3 }}>
				<Typography variant="h5">Selecciona una materia.</Typography>
			</Box>
			<Box>
				{subjects.map((subject) => {
					return (
						<Box sx={{ mb: 2 }} key={subject.value}>
							<Link to={subject.value}>{subject.label}</Link>
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
