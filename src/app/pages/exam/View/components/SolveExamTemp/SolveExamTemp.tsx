import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { contextExam, examResultType } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import Exercises from '../../../components/Exercises';
import FinishExamButton from './FinishExamButton';

interface SolveExamTempProps {
	labels: {
		subject: string;
		examType: string;
		department: string;
		examNumber: number;
		year: number;
	};
}

export default function SolveExamTemp(props: SolveExamTempProps) {
	const { labels } = props;
	const { selectedOptions, setSelectedOptions, numFullSelect } =
		useContext<contextExam>(ExamContext);
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

	useEffect(() => {
		if (selectedOptions.length !== 0) {
			localStorage.setItem(
				`${params.id}_result`,
				JSON.stringify({
					enabled: true,
					complete: false,
					selected_options: selectedOptions,
				}),
			);
		}
	}, [selectedOptions]);

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
			<Exercises />
			<Box sx={{ pb: 2 }}>
				<FinishExamButton enabled={selectedOptions.length === numFullSelect} />
			</Box>
		</Box>
	);
}
