import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { contextExam, examResultType } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';

import ExercisesResult from 'app/pages/exam/components/ExercisesResult';

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

	useEffect(() => {
		const exam_result = JSON.parse(
			localStorage.getItem(`${params.id}_result`),
		) as examResultType | null;
		if (exam_result !== null) {
			setSelectedOptions(exam_result.selected_options);
		}
	}, [params.id]);

	return (
		<Box>
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
			<ExercisesResult />
		</Box>
	);
}
