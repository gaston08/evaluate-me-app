import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

interface QuestionProps {
	question: string;
	correctOptionsLength: number;
}

export default function Question(props: QuestionProps) {
	const { question, correctOptionsLength } = props;
	const theme = useTheme();

	return (
		<Box
			sx={{
				p: 2,
				background:
					theme.custom !== undefined ? theme.custom.background.light : '',
			}}
		>
			<div
				dangerouslySetInnerHTML={{
					__html: question,
				}}
				className="tiptap"
			></div>
			<Box sx={{ mt: 2 }}>
				<Typography color="primary" variant="body">
					Selecciona {correctOptionsLength} opciones.
				</Typography>
			</Box>
		</Box>
	);
}
