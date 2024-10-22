import { useContext } from 'react';
import Box from '@mui/material/Box';
import OptionItem from './OptionItem';
import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';

import {
	exerciseType,
	optionType,
	selectedOptionsInterfacae,
} from 'app/shared/interfaces/exam';

interface CodeOptionsProps {
	exercise: exerciseType;
	i: number;
}

export default function CodeOptions(props: CodeOptionsProps) {
	const { exercise, i } = props;
	const { selectedOptions } = useContext<contextExam>(ExamContext);

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
						<OptionItem
							key={option.id}
							option={option}
							isSelected={selectedOptions.some(
								(selectedOpt) =>
									selectedOpt.optionId === option.id &&
									selectedOpt.exerciseId === exercise.id,
							)}
							isCorrect={selectedOptions.some(
								(selectedOpt: selectedOptionsInterfacae) =>
									exercise.correctOptions[i].includes(selectedOpt.optionId) &&
									exercise.id === selectedOpt.exerciseId &&
									selectedOpt.optionId === option.id,
							)}
						/>
					);
				})}
			</tbody>
		</Box>
	);
}
