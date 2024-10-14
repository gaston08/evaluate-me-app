import { useContext } from 'react';
import Box from '@mui/material/Box';
import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import OptionItem from './OptionItem';

import { exerciseType, optionType } from 'app/shared/interfaces/exam';

interface OptionsPlayProps {
	exercise: exerciseType;
	index: number;
	selectOption: (optionId: string, index: string) => void;
}

export default function OptionsPlay(props: OptionsPlayProps) {
	const { exercise, index, selectOption } = props;
	const { selectedOptions } = useContext<contextExam>(ExamContext);

	return (
		<Box
			sx={{
				pt: 0,
				pb: 0,
				width: '100%',
			}}
		>
			{exercise.options[index].map((option: optionType) => {
				return (
					<OptionItem
						key={option.id}
						exerciseId={exercise.id}
						index={index}
						option={option}
						isSelected={selectedOptions.some(
							(selectedOpt) =>
								selectedOpt.optionId === option.id &&
								selectedOpt.exerciseId === exercise.id,
						)}
						selectOption={selectOption}
					/>
				);
			})}
		</Box>
	);
}
