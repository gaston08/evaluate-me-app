import * as React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';

import Option from './components/Option';
import { exerciseType, optionType } from 'app/shared/interfaces/exercise';

interface ExerciseProps {
	exercise: exerciseType;
	canSelect: boolean;
}

export default function Exercise(props: ExerciseProps) {
	const exercise: exerciseType = props.exercise;
	const canSelect: boolean = props.canSelect;
	const theme = useTheme();

	return (
		<Box sx={{ width: '100%', mb: 5 }}>
			{Array.from(Array(exercise.question.length), (e, i) => {
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
										exerciseId={exercise.id}
										id={option.id}
										title={option.title}
										canSelect={canSelect}
									/>
								);
							})}
						</List>
					</Box>
				);
			})}
		</Box>
	);
}
