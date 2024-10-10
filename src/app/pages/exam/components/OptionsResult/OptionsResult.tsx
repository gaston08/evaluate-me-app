import { useContext } from 'react';
import Box from '@mui/material/Box';
import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import OptionItem from './OptionItem';

import {
	exerciseType,
	optionType,
	selectedOptionsInterfacae,
} from 'app/shared/interfaces/exam';

interface OptionsProps {
	exercise: exerciseType;
	i: number;
}

export default function Options(props: OptionsProps) {
	const { exercise, i } = props;
	const { selectedOptions } = useContext<contextExam>(ExamContext);

	return (
		<Box
			sx={{
				pt: 0,
				pb: 0,
				width: '100%',
			}}
		>
			{exercise.options[i].map((option: optionType) => {
				return (
					<OptionItem
						key={option.id}
						option={option}
						isSelected={selectedOptions.some(
							(selectedOpt) => selectedOpt.optionId === option.id,
						)}
						isCorrect={selectedOptions.some(
							(selectedOpt: selectedOptionsInterfacae) =>
								exercise.correctOptions[i].includes(selectedOpt.optionId),
						)}
					/>
				);
			})}
		</Box>
	);
}
