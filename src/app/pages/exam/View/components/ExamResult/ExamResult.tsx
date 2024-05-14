import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactTimeAgo from 'react-time-ago';
import { useTheme } from '@mui/material/styles';
import Confetti from './Confetti';

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

	function getDataRender() {
		let text: string;
		let color: string;
		let confetties: number;
		const roundedScore = Math.ceil(score);
		switch (roundedScore) {
			case 10:
				text = '¡Perfecto!';
				color = theme.palette.success.light;
				confetties = 500;
				break;
			case 9:
				text = '¡Impresionante!';
				color = theme.palette.success.light;
				confetties = 300;
				break;
			case 7:
			case 8:
				text = '¡Excelente!';
				color = theme.palette.success.main;
				confetties = 100;
				break;
			case 6:
			case 5:
			case 4:
				text = '¡Muy bien!';
				color = theme.palette.success.main;
				confetties = 0;
				break;
			case 3:
			case 2:
			case 1:
			case 0:
				text = 'Ups... Sigue intentando!';
				color = theme.palette.error.main;
				confetties = 0;
				break;
		}

		if (roundedScore >= 7) {
			const audio = new Audio('/success.mp3');
			audio.play().catch(console.error);
		}

		return { text, color, confetties };
	}

	const { text, color, confetties } = getDataRender();

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
			<Box sx={{ position: 'fixed', top: 0 }}>
				<Confetti confetties={confetties} />
			</Box>
		</Box>
	);
}
