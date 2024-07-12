import { useContext } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

import Option from './components/Option';
import {
	contextExam,
	exerciseType,
	optionType,
	exerciseFeedback,
} from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextUi } from 'app/shared/interfaces/ui';
import { UiContext } from 'app/contexts/Ui';

interface ExerciseProps {
	exercise: exerciseType;
	idx: number;
	exerciseFeedback: exerciseFeedback;
}

export default function Exercise(props: ExerciseProps) {
	const exercise: exerciseType = props.exercise;
	const exerciseIdx: number = props.idx;
	const exerciseFeedback: exerciseFeedback = props.exerciseFeedback;

	const { examsUi } = useContext<contextUi>(UiContext);
	const isPlayView = examsUi.isPlayView;

	const theme = useTheme();
	const { selectedOptions } = useContext<contextExam>(ExamContext);

	return (
		<Box className="exercise-exam">
			<>
				{Array.from(Array(exercise.question.length), (e, i: number) => {
					return (
						<Box key={i}>
							<Paper
								elevation={0}
								sx={{ p: 2, background: theme.custom.background.light }}
							>
								<div
									dangerouslySetInnerHTML={{
										__html: exercise.question[i],
									}}
									className="tiptap"
								></div>
								<>
									{isPlayView ? (
										<Box sx={{ mt: 2 }}>
											<Typography color="primary" variant="body">
												{selectedOptions[exerciseIdx][i].length}/
												{exercise.correctOptions[i].length} seleccionados.
											</Typography>
										</Box>
									) : null}
								</>
							</Paper>
							<List component="nav" sx={{ pt: 0, pb: 0 }}>
								{exercise.options[i].map((option: optionType) => {
									return (
										<Option
											key={option.id}
											exerciseId={exercise.id}
											id={option.id}
											title={option.title}
											correctOptionsLength={exercise.correctOptions[i].length}
											exerciseIdx={exerciseIdx}
											optionsIdx={i}
											isSelected={selectedOptions[exerciseIdx][i].includes(
												option.id,
											)}
											isCorrect={exercise.correctOptions[i].includes(option.id)}
										/>
									);
								})}
							</List>
						</Box>
					);
				})}
			</>
			<>
				<Box sx={{ pl: 2, mt: 2 }}>
					<>
						{exerciseFeedback.success !== '' ? (
							<>
								{exerciseFeedback.html ? (
									<Alert severity="success">
										<AlertTitle>Correcto!</AlertTitle>
										<div
											dangerouslySetInnerHTML={{
												__html: exerciseFeedback.success,
											}}
										></div>
									</Alert>
								) : (
									<Typography color="success">
										{exerciseFeedback.success}
									</Typography>
								)}
							</>
						) : null}
					</>
					<>
						{exerciseFeedback.error !== '' ? (
							<>
								{exerciseFeedback.html ? (
									<Alert severity="error">
										<AlertTitle>Incorrecto.</AlertTitle>
										<div
											dangerouslySetInnerHTML={{
												__html: exerciseFeedback.error,
											}}
										></div>
									</Alert>
								) : (
									<Box sx={{ display: 'flex' }}>
										<Box sx={{ mr: 1, color: 'red' }}>
											<ExclamationIcon />
										</Box>
										<Typography color="error">
											{exerciseFeedback.error}
										</Typography>
									</Box>
								)}
							</>
						) : null}
					</>
				</Box>
			</>
		</Box>
	);
}

function ExclamationIcon() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="circle-exclamation"
			className="svg-inline--fa fa-circle-exclamation "
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			style={{ width: 20, height: 20 }}
		>
			<path
				fill="currentColor"
				d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
			></path>
		</svg>
	);
}
