import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { contextExam, examResultType } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import ExercisesPlay from 'app/pages/exam/components/ExercisesPlay';
import FinishExamButton from './components/FinishExamButton';
import ExamProgress from './components/ExamProgress';

import Loader from 'app/components/Loader';

interface SolveExamProps {
	labels: {
		subject: string;
		examType: string;
		department: string;
		examNumber: number;
		year: number;
	};
}

export default function SolveExam(props: SolveExamProps) {
	const { labels } = props;
	const { selectedOptions, setSelectedOptions, numFullSelect } =
		useContext<contextExam>(ExamContext);
	const theme = useTheme();
	const params = useParams();
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

		if (exam_result === null) {
			setSelectedOptions([]);
		} else {
			setSelectedOptions(exam_result.selected_options);
		}
	}, [params.id]);

	return (
		<Box>
			<ExamProgress />
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
			<ExercisesPlay />
			<Box sx={{ pb: 2 }}>
				<FinishExamButton enabled={selectedOptions.length === numFullSelect} />
			</Box>
		</Box>
	);
}
