import { Fragment } from 'react';
import Box from '@mui/material/Box';

import { questionType } from 'app/shared/interfaces/exam';

interface PythonQuestionProps {
	question: questionType;
}

export default function PythonQuestion(props: PythonQuestionProps) {
	const { question } = props;
	return (
		<Fragment>
			{question.python_code ? (
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
							 
							__html: question.text,
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
							 
							__html: question.text,
						}}
						sx={{ p: 3 }}
					></Box>
				</Box>
			)}
		</Fragment>
	);
}
