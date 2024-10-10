import { Fragment, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';
import { examResultType } from 'app/shared/interfaces/exam';

interface FinishExamButtonProps {
	enabled: boolean;
}

export default function FinishExamButton(props: FinishExamButtonProps) {
	const { enabled } = props;
	const { setExamState } = useContext<contextExam>(ExamContext);
	const params = useParams();

	const finishExam = () => {
		// mostrar el loading, y luego renderizar el componente de resulados
		const exam_result = JSON.parse(
			localStorage.getItem(`${params.id}_result`),
		) as examResultType | null;

		if (exam_result !== null) {
			localStorage.setItem(
				`${params.id}_result`,
				JSON.stringify({
					...exam_result,
					enabled: false,
					completed: true,
				}),
			);

			setExamState({
				showInitialForm: false,
				showSolveExam: false,
				showExamResult: true,
			});
		}
	};

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
			<Button
				disabled={!enabled}
				variant="contained"
				color="primary"
				onClick={finishExam}
			>
				finalizar examen
			</Button>
			<Fragment>
				{!enabled && (
					<Box>
						<Typography color="error">
							Faltan ejercicios por resolver.
						</Typography>
					</Box>
				)}
			</Fragment>
		</Box>
	);
}
