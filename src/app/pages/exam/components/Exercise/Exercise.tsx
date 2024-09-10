import { useContext } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
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
							{exercise.question[i].code ? (
								<>
									{exercise.question[i].python_code ? (
										<Box
											sx={{
												borderTop: '2px solid #555',
												borderLeft: '2px solid #555',
												overflow: 'scroll',
											}}
											id="exercise-title"
											className="highlight-code"
										>
											<Box
												className="lightbulb"
												dangerouslySetInnerHTML={{
													// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
													__html: exercise.question[i].text,
												}}
											></Box>
										</Box>
									) : (
										<Box
											sx={{
												borderTop: '2px solid #555',
												borderLeft: '2px solid #555',
												borderRight: '2px solid #555',
												borderBottom: '2px solid #555',
											}}
											id="exercise-title"
											className="highlight-code"
										>
											<Box
												className="lightbulb"
												dangerouslySetInnerHTML={{
													// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
													__html: exercise.question[i].text,
												}}
												sx={{ p: 3 }}
											></Box>
										</Box>
									)}
								</>
							) : (
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
							)}

							<>
								{exercise.question[i].code ? (
									<Box
										component="table"
										sx={{
											pt: 0,
											pb: 0,
											width: '100%',
											borderCollapse: 'collapse',
											tableLayout: 'fixed',
										}}
									>
										<tbody>
											{exercise.options[i].map((option: optionType) => {
												return (
													<Option
														key={option.id}
														exerciseId={exercise.id}
														option={option}
														correctOptionsLength={
															exercise.correctOptions[i].length
														}
														exerciseIdx={exerciseIdx}
														optionsIdx={i}
														isSelected={selectedOptions[exerciseIdx][
															i
														].includes(option.id)}
														isCorrect={exercise.correctOptions[i].includes(
															option.id,
														)}
													/>
												);
											})}
										</tbody>
									</Box>
								) : (
									<Box
										sx={{
											pt: 0,
											pb: 0,
											width: '100%',
										}}
									>
										{exercise.options[i].map((option: optionType) => {
											return (
												<Option
													key={option.id}
													exerciseId={exercise.id}
													option={option}
													correctOptionsLength={
														exercise.correctOptions[i].length
													}
													exerciseIdx={exerciseIdx}
													optionsIdx={i}
													isSelected={selectedOptions[exerciseIdx][i].includes(
														option.id,
													)}
													isCorrect={exercise.correctOptions[i].includes(
														option.id,
													)}
												/>
											);
										})}
									</Box>
								)}
							</>
						</Box>
					);
				})}
			</>
			<>
				<Box sx={{ pl: 2, mt: 2 }} id="exercise-feedback-view">
					<>
						{exerciseFeedback.success !== '' ? (
							<>
								{exerciseFeedback.html ? (
									<Alert severity="success" className="alert-mui">
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
									<Alert severity="error" className="alert-mui">
										<AlertTitle>Incorrecto.</AlertTitle>
										<div
											dangerouslySetInnerHTML={{
												__html: exerciseFeedback.error,
											}}
										></div>
									</Alert>
								) : (
									<Box className="normal-feedback" sx={{ display: 'flex' }}>
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
