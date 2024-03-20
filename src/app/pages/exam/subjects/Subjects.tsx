import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { categories } from 'app/shared/data/exam';

export default function Subjects() {
	return (
		<Box>
			{categories.map((category) => {
				return (
					<div key={category.value}>
						<Link to={category.value.replaceAll(' ', '-')}>
							{category.label}
						</Link>
					</div>
				);
			})}
		</Box>
	);
}
