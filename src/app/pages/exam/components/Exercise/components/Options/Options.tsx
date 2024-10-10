import { useContext, useCallback } from 'react';
import Box from '@mui/material/Box';
import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import OptionItem from './OptionItem';

import { exerciseType, optionType } from 'app/shared/interfaces/exam';

interface OptionsProps {
	exercise: exerciseType;
	i: number;
}

export default function Options(props: OptionsProps) {
	const { exercise, i } = props;
	const { selectedOptions, setSelectedOptions } =
		useContext<contextExam>(ExamContext);

	const selectOption = useCallback(
		(optionId: string) => {
			let newSelected = [];

			setSelectedOptions((prev) => {
				if (prev.findIndex((selOpt) => selOpt.optionId === optionId) === -1) {
					const num_selected = prev.filter(
						(selOpt) =>
							selOpt.exerciseId === exercise.id &&
							exercise.options[i].some((opt) => opt.id === selOpt.optionId),
					).length;

					if (num_selected === exercise.correctOptions[i].length) {
						const idx = prev.findIndex(
							(selOpt) =>
								selOpt.exerciseId === exercise.id &&
								exercise.options[i].some((opt) => opt.id === selOpt.optionId),
						);

						prev.splice(idx, 1);
						newSelected = [...prev];
						newSelected.push({ exerciseId: exercise.id, optionId: optionId });
						return newSelected;
					} else {
						newSelected = [
							...prev,
							{
								exerciseId: exercise.id,
								optionId: optionId,
							},
						];

						return newSelected;
					}
				} else {
					newSelected = prev.filter((selOpt) => selOpt.optionId !== optionId);
					return newSelected;
				}
			});
		},
		[selectedOptions.length],
	);

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
						exerciseId={exercise.id}
						option={option}
						isSelected={selectedOptions.some(
							(selectedOpt) => selectedOpt.optionId === option.id,
						)}
						selectOption={selectOption}
					/>
				);
			})}
		</Box>
	);
}
