import { useEffect, useState } from 'react';
import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import { ExercisesContext } from '../../../../../../contexts/Exercises';

interface OptionProps {
	id: number;
	title: string;
}

export default function Option(props: OptionProps) {
	const { title, id, exerciseId } = props;
	const { setSelected: setSelectedArr, selected: selectedArr } =
		useContext(ExercisesContext);
	const [isSelected, setIsSelected] = useState();

	useEffect(() => {
		setIsSelected(() => {
			return checkSelect(id);
		});
	}, [selectedArr]);

	const selectOption = (id) => {
		setSelectedArr((prev) => {
			const arr = [...prev];

			const index = arr.findIndex((opt) => opt.exerciseId === exerciseId);
			if (index !== -1) {
				arr[index] = {
					optionId: id,
					exerciseId,
				};
			} else {
				arr.push({
					optionId: id,
					exerciseId,
				});
			}
			return arr;
		});
	};

	const checkSelect = (optionId) => {
		const res = selectedArr.some(
			(el) => el.optionId === optionId && el.exerciseId === exerciseId
		);
		return res;
	};

	return (
		<Paper
			component="button"
			elevation={0}
			onClick={() => selectOption(id)}
			sx={{
				width: '100%',
				p: 2,
			}}
		>
			{title}
		</Paper>
	);
}
