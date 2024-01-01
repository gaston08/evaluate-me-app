import * as React from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';

import Option from './components/Option';

export default function Exerise(props) {
	const { exercise, canSelect } = props;
	const theme = useTheme();

	return (
		<Box sx={{ width: '100%', mb: 4 }}>
			<Paper
				elevation={0}
				sx={{ p: 2, background: theme.custom.background.light }}
			>
				<div
					dangerouslySetInnerHTML={{
						__html: exercise.question,
					}}
					className="tiptap"
				></div>
			</Paper>
			<List component="nav" sx={{ pt: 0 }}>
				{exercise.options.map((option) => {
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
}
