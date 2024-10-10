import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactTimeAgo from 'react-time-ago';
import { useTheme } from '@mui/material/styles';
import Confetti from 'app/components/Confetti';
import audioUrl from 'assets/success.mp3';

interface ScoreProps {
	score: number;
	totalPts: number;
	date: string;
}

export default function Score(props: ScoreProps) {
	const { score, totalPts, date } = props;
	const [text, setText] = useState<string>('');
	const [color, setColor] = useState<string>('');
	const [confetties, setConfetties] = useState<number>(0);

	const theme = useTheme();

	useEffect(() => {
		let text: string;
		let color: string;
		let confetties: number;
		const roundedScore = Math.ceil((score / totalPts) * 10);
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
			const audio = new Audio(audioUrl);
			audio.play().catch(console.error);
		}

		setText(text);
		setColor(color);
		setConfetties(confetties);
	}, [score, totalPts]);

	return (
		<Box sx={{ mb: 3 }} id="exam-result">
			<Typography variant="h4" sx={{ color, mt: 1 }}>
				{text}
			</Typography>
			<Typography variant="h5" sx={{ color, mt: 1, fontWeight: 600 }}>
				NOTA: {Math.ceil((score / totalPts) * 10)}/10
			</Typography>
			<Typography id="date-result">
				<ReactTimeAgo date={new Date(date)} locale="es-AR" />
			</Typography>
			<Box sx={{ position: 'fixed', top: 0 }}>
				<Confetti confetties={confetties} />
			</Box>
		</Box>
	);
}
