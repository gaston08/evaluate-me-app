import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface FinishExamButtonProps {
	enabled: boolean;
}

export default function FinishExamButton(props: FinishExamButtonProps) {
	const { enabled } = props;

	const finishExam = () => {
		console.log('FNISH');
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
			<Button
				disabled={!enabled}
				variant="contained"
				color="primary"
				onClick={finishExam}
			>
				finalizar examen
			</Button>
			<Fragment>
				{!enabled && (
					<Box>
						<Typography color="error">
							Faltan ejercicios por resolver.
						</Typography>
					</Box>
				)}
			</Fragment>
		</Box>
	);
}
