import { useContext } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

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
		<Box>
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
							<Box>
								{exerciseFeedback.html ? (
									<Box sx={{ color: theme.palette.success.main }}>
										<div
											dangerouslySetInnerHTML={{
												__html: exerciseFeedback.success,
											}}
										></div>
									</Box>
								) : (
									<Typography color="#689f38">
										{exerciseFeedback.success}
									</Typography>
								)}
							</Box>
						) : null}
					</>
					<>
						{exerciseFeedback.error !== '' ? (
							<>
								{exerciseFeedback.html ? (
									<Box sx={{ color: theme.palette.error.main }}>
										<div
											dangerouslySetInnerHTML={{
												__html: exerciseFeedback.error,
											}}
										></div>
									</Box>
								) : (
									<Box sx={{ display: 'flex' }}>
										<Box sx={{ mr: 1, color: 'red' }}>
											<FontAwesomeIcon icon={faCircleExclamation} />
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
