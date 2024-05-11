import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactTimeAgo from 'react-time-ago';
import { useTheme } from '@mui/material/styles';

interface ExamResultProps {
	score: number;
	totalPts: number;
	date: string;
}

export default function ExamResult(props: ExamResultProps) {
	const score: number = props.score;
	const totalPts: number = props.totalPts;
	const date: string = props.date;

	const theme = useTheme();

	console.log(theme.palette);

	function getDataRender() {
		let text: string;
		let color: string;
		switch (10) {
			case 10:
				text = '¡Perfecto!';
				color = theme.palette.success.light;
				break;
			case 9:
				text = '¡Impresionante!';
				color = theme.palette.success.light;
				break;
			case 7:
			case 8:
				text = '¡Excelente!';
				color = theme.palette.success.main;
				break;
			case 6:
			case 5:
			case 4:
				text = '¡Muy bien!';
				color = theme.palette.success.dark;
				break;
			case 3:
			case 2:
			case 1:
			case 0:
				text = '¡Sigue intentando!';
				color = theme.palette.error.main;
				break;
		}

		return { text, color };
	}

	const { text, color } = getDataRender();

	return (
		<Box sx={{ mb: 3 }}>
			<Typography variant="h4" sx={{ color, mt: 1 }}>
				{text}
			</Typography>
			<Typography variant="h5" sx={{ color, mt: 1, fontWeight: 600 }}>
				NOTA: {score}/{totalPts}
			</Typography>
			<Typography sx={{ color: theme.palette.text.secondary }}>
				<ReactTimeAgo date={new Date(date)} locale="es-AR" />
			</Typography>
		</Box>
	);
}
