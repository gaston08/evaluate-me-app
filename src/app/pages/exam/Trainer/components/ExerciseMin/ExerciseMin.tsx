import * as React from 'react';
import { useState, useEffect } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Option from './components/Option';
import Argument from './components/Argument';
import { exerciseType, optionType } from 'app/shared/interfaces/exam';

interface ExerciseProps {
	exercise: exerciseType;
	completed: boolean;
	setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Exercise(props: ExerciseProps) {
	const { completed, setCompleted, exercise } = props;
	const [selected, setSelected] = useState<Array<string>>([]);

	const theme = useTheme();

	useEffect(() => {
		if (
			exercise.correctOptions.flat(Infinity).sort().join(',') ===
			selected.sort().join(',')
		) {
			setCompleted(true);
		}
	}, [selected]);

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
		</Box>
	);
}
