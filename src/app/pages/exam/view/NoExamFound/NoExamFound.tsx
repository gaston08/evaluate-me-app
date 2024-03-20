import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

interface componentProps {
	errors: Array<string>;
}

export default function NoExamFound(props: componentProps) {
	const errors: Array<string> = props.errors;

	return (
		<>
			<Alert severity="error">
				<AlertTitle>No se encontró el exámen.</AlertTitle>
				{errors.map((err: string, i: number) => {
					return (
						<Typography key={i} variant="h6">
							{err}
						</Typography>
					);
				})}
			</Alert>
		</>
	);
}
