import { useEffect, useState, useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material/styles';
import { ExercisesContext } from '../../../../../../contexts/Exercises';

interface OptionProps {
	id: number;
	title: string;
}

export default function Option(props: OptionProps) {
	const { title, id, exerciseId, canSelect } = props;
	const { setSelected: setSelectedArr, selected: selectedArr } =
		useContext(ExercisesContext);
	const [isSelected, setIsSelected] = useState();
	const theme = useTheme();

	const checkSelect = (optionId) => {
		const res = selectedArr.some(
			(el) => el.optionId === optionId && el.exerciseId === exerciseId
		);
		return res;
	};
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

	useEffect(() => {
		setIsSelected(() => {
			return checkSelect(id);
		});
	}, [id, selectedArr, checkSelect]);

	return (
		<ListItemButton
			selected={isSelected}
			onClick={() => {
				if (canSelect) {
					selectOption(id);
				}
			}}
			sx={{
				'&:hover, &.Mui-selected, &.Mui-selected:hover': {
					backgroundColor: theme.custom.background.main,
				},
			}}
		>
			<ListItemText primary={title} />
		</ListItemButton>
	);
}
