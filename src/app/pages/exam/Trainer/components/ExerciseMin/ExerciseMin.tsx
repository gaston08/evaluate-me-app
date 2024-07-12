import * as React from 'react';
import { useState, useEffect } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Option from './components/Option';
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

	useEffect(() => {
		if (completed) {
			document.getElementById(exercise.id).scrollIntoView({
				behavior: 'smooth',
			});
			printSentence('argument-container', exercise.argument, 10);
		}
	}, [completed]);

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
							</Paper>
							<List component="nav" sx={{ pt: 0, pb: 0 }}>
								{exercise.options[i].map((option: optionType) => {
									return (
										<Option
											key={option.id}
											id={option.id}
											title={option.title}
											feedback={option.feedback}
											onSelect={setSelected}
											arrSelected={selected}
											isCorrect={exercise.correctOptions.some((b) =>
												b.includes(option.id),
											)}
											canSelect={!completed}
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
					{completed ? (
						<Alert sx={{ minHeight: 250 }} severity="success" id={exercise.id}>
							<AlertTitle>Correcto!</AlertTitle>
							<div id="argument-container"></div>
						</Alert>
					) : null}
				</Box>
			</>
		</Box>
	);
}

const printSentence = (id: string, sentence: string, speed: number = 10) => {
	let index: number = 0;
	const element: HTMLDivElement = document.getElementById(id);

	const timer = setInterval(function () {
		const char: string = sentence[index];

		if (char === '<') {
			index = sentence.indexOf('>', index); // skip to greater-than
		}

		element.innerHTML = sentence.slice(0, index);

		if (++index === sentence.length) {
			clearInterval(timer);
		}
	}, speed);
};
