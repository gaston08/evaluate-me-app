import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { contextExam, examResultType } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';

import ExercisesResult from 'app/pages/exam/components/ExercisesResult';
import Loader from 'app/components/Loader';
import Score from './Score';

interface ExamResultProps {
	labels: {
		subject: string;
		examType: string;
		department: string;
		examNumber: number;
		year: number;
	};
}

export default function ExamResult(props: ExamResultProps) {
	const { labels } = props;
	const { setSelectedOptions } = useContext<contextExam>(ExamContext);
	const theme = useTheme();
	const params = useParams();
	const [score, setScore] = useState<number>(0);
	const [totalPts, setTotalPts] = useState<number>(10);
	const [date, setDate] = useState<string>(new Date().toString());
	const [showLoader, setShowLoader] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => {
			setShowLoader(false);
		}, 1500);
	}, []);

	useEffect(() => {
		const exam_result = JSON.parse(
			localStorage.getItem(`${params.id}_result`),
		) as examResultType | null;
		if (exam_result !== null) {
			setSelectedOptions(exam_result.selected_options);
			setScore(Number(exam_result.score));
			setTotalPts(Number(exam_result.total_pts));
			setDate(exam_result.date);
		}

		window.scrollTo(0, 0);
	}, [params.id]);

	return (
		<Box>
			<Loader open={showLoader} />
			<Box
				sx={{
					mb: 3,
				}}
				id="exam-info-view"
			>
				<Typography
					variant="h5"
					sx={{
						mb: 2,
						color: theme.palette.text.secondary,
					}}
				>
					{labels.subject}, {labels.year}
				</Typography>
				<Typography variant="h5">
					{`${labels.examType}, TEMA ${labels.examNumber}, ${labels.department}`}
				</Typography>
			</Box>
			<Box>
				<Score date={date} score={score} totalPts={totalPts} />
			</Box>
			<ExercisesResult />
		</Box>
	);
}
