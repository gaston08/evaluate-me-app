import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import { useTheme } from '@mui/material/styles';
import es from 'javascript-time-ago/locale/es';

TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);

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

	return (
		<Box sx={{ mb: 3 }}>
			<Typography
				variant="h4"
				color="#424242"
				sx={{ color: theme.palette.info.main, mt: 2 }}
			>
				NOTA: {score}/{totalPts}
			</Typography>
			<ReactTimeAgo date={new Date(date)} locale="es-AR" />
		</Box>
	);
}
