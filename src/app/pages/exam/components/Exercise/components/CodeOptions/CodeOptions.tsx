import Box from '@mui/material/Box';
import Option from './Option';

import { exerciseType, optionType } from 'app/shared/interfaces/exam';

interface CodeOptionsProps {
	exercise: exerciseType;
	i: number;
}

export default function CodeOptions(props: CodeOptionsProps) {
	const { exercise, i } = props;
	return (
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
							correctOptionsLength={exercise.correctOptions[i].length}
							optionsIdx={i}
							isSelected={true}
							isCorrect={exercise.correctOptions[i].includes(option.id)}
						/>
					);
				})}
			</tbody>
		</Box>
	);
}
