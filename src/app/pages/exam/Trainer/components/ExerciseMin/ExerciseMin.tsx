import { Fragment, useState, useEffect, useContext } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import Option from './components/Option';
import Argument from './components/Argument';
import ReferenceQuestionModal from './components/ReferenceQuestionModal';
import NoCoffeesDialog from 'app/components/NoCoffeesDialog';
import { exerciseType, optionType } from 'app/shared/interfaces/exam';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';

interface ExerciseProps {
	exercise: exerciseType;
	completed: boolean;
	setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
	referenceQuestion: Array<string>;
}

export default function Exercise(props: ExerciseProps) {
	const { completed, setCompleted, exercise, referenceQuestion } = props;
	const [selected, setSelected] = useState<Array<string>>([]);
	const { auth } = useContext<contextAuth>(AuthContext);
	const [open, setOpen] = useState<boolean>(false);

	const theme = useTheme();

	const [openReference, setOpenReference] = useState(false);
	const handleOpenReference = () => { setOpenReference(true); };
	const handleCloseReference = () => { setOpenReference(false); };

	useEffect(() => {
		if (
			exercise.correctOptions.flat(Infinity).sort().join(',') ===
			selected.sort().join(',')
		) {
			setCompleted(true);
		}
	}, [selected]);

	const handleClickOption = () => {
		if (auth.coffees === 0) {
			setOpen(true);
		}
	};

	const showReferenceQuestion = () => {
		handleOpenReference();
	};

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
									<Fragment>
										{referenceQuestion.length !== 0 && i === 0 ? (
											<Box sx={{ mt: 2, mb: 1 }}>
												<Button
													variant="contained"
													size="small"
													color="secondary"
													onClick={showReferenceQuestion}
												>
													Ver ejercicio
												</Button>
											</Box>
										) : null}
									</Fragment>
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
										}}
										onClick={handleClickOption}
									>
										<tbody>
											{exercise.options[i].map((option: optionType) => {
												return (
													<Option
														key={option.id}
														option={option}
														onSelect={setSelected}
														arrSelected={selected}
														isCorrect={exercise.correctOptions.some((b) =>
															b.includes(option.id),
														)}
														canSelect={!completed}
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
										onClick={handleClickOption}
									>
										{exercise.options[i].map((option: optionType) => {
											return (
												<Option
													key={option.id}
													option={option}
													onSelect={setSelected}
													arrSelected={selected}
													isCorrect={exercise.correctOptions.some((b) =>
														b.includes(option.id),
													)}
													canSelect={!completed}
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
				<Box sx={{ pl: 2, mt: 2 }}>
					{completed ? <Argument exercise={exercise} /> : null}
				</Box>
			</>
			<>
				<NoCoffeesDialog open={open} setOpen={setOpen} />
			</>
			<>
				<ReferenceQuestionModal
					open={openReference}
					handleClose={handleCloseReference}
					referenceQuestion={referenceQuestion}
				/>
			</>
		</Box>
	);
}
