import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { subjects } from 'app/shared/data/exam';

export default function Subjects() {
	return (
		<Box>
			{subjects.map((subject) => {
				return (
					<div key={subject.value}>
						<Link to={subject.value}>{subject.label}</Link>
					</div>
				);
			})}
		</Box>
	);
}
