import { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import { contextExercise } from 'app/shared/interfaces/exercise';
import { ExercisesContext } from 'app/contexts/Exercises';

interface OptionProps {
	id: string;
	title: string;
	exerciseId: string;
	correctOptionsLength: number;
	optionsIdx: number;
	exerciseIdx: number;
	isSelected: boolean;
}

export default function Option(props: OptionProps) {
	const {
		id,
		title,
		correctOptionsLength,
		optionsIdx,
		exerciseIdx,
		isSelected,
	} = props;
	const { setSelectedOptions } = useContext<contextExercise>(ExercisesContext);
	const theme = useTheme();

	const selectOption = () => {
		setSelectedOptions((prev) => {
			const oldArr = [...prev];
			if (oldArr[exerciseIdx][optionsIdx].includes(id)) {
				const idx = oldArr[exerciseIdx][optionsIdx].indexOf(id);
				oldArr[exerciseIdx][optionsIdx].splice(idx, 1);
			} else {
				oldArr[exerciseIdx][optionsIdx].push(id);
				if (oldArr[exerciseIdx][optionsIdx].length > correctOptionsLength) {
					oldArr[exerciseIdx][optionsIdx] = oldArr[exerciseIdx][
						optionsIdx
					].slice(
						oldArr[exerciseIdx][optionsIdx].length - correctOptionsLength,
						oldArr[exerciseIdx][optionsIdx].length,
					);
				}
			}

			return oldArr;
		});
	};

	return (
		<ListItemButton
			sx={{
				'&:hover, &.Mui-selected, &.Mui-selected:hover': {
					backgroundColor: theme.custom.background.main,
				},
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: isSelected ? theme.custom.background.main : null,
			}}
			onClick={selectOption}
		>
			<div dangerouslySetInnerHTML={{ __html: title }}></div>
		</ListItemButton>
	);
}
