import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Option from './components/Option';

export default function Exercise(props) {
	const { exercise, sx } = props;

	return (
		<Box sx={sx}>
			<Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
				<Typography variant="h6" gutterBottom>
					{exercise.question}
				</Typography>
			</Paper>
			{exercise.options.map((option) => {
				return (
					<Option
						key={option.id}
						exerciseId={exercise.id}
						id={option.id}
						title={option.title}
					/>
				);
			})}
		</Box>
	);
}
