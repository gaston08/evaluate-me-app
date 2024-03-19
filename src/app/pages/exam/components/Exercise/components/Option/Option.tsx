import { useEffect, useState, useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import { ExercisesContext } from 'app/contexts/Exercises';
import {
	contextExercises,
	selectedInterface,
} from 'app/shared/interfaces/exercise';

interface OptionProps {
	id: number;
	title: string;
	canSelect: boolean;
	exerciseId: string;
}

export default function Option(props: OptionProps) {
	const { title, id, exerciseId, canSelect } = props;
	const { setSelected: setSelectedArr, selected: selectedArr } = useContext(
		ExercisesContext,
	) as contextExercises;
	const [isSelected, setIsSelected] = useState();
	const theme = useTheme();

	const checkSelect = (optionId) => {
		const res: boolean = selectedArr.some(
			(el) => el.optionId === optionId && el.exerciseId === exerciseId,
		);
		return res;
	};
	const selectOption = (id: string) => {
		setSelectedArr((prev: Array<selectedInterface>) => {
			const arr: Array<selectedInterface> = [];
			prev.forEach((val) => arr.push(Object.assign({}, val)));

			const index: number = arr.findIndex(
				(opt) => opt.exerciseId === exerciseId,
			);
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
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<div dangerouslySetInnerHTML={{ __html: title }}></div>
		</ListItemButton>
	);
}
