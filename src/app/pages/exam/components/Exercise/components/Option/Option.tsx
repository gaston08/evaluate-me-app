import { useEffect, useState, useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { ExercisesContext } from 'app/contexts/Exercises';
import {
	contextExercises,
	contextExercise,
	selectedInterface,
	exerciseType,
} from 'app/shared/interfaces/exercise';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExerciseContext } from 'app/contexts/Exercise';

interface OptionProps {
	id: number;
	title: string;
	canSelect: boolean;
	exerciseId: string;
	canDelete: boolean;
}

export default function Option(props: OptionProps) {
	const { title, id, exerciseId, canSelect, canDelete } = props;
	const { setSelected: setSelectedArr, selected: selectedArr } = useContext(
		ExercisesContext,
	) as contextExercises;
	const [isSelected, setIsSelected] = useState();
	const theme = useTheme();
	const myContextExercise: contextExercise = useContext(
		ExerciseContext,
	) ;
	const setCurrentExercise: React.Dispatch<React.SetStateAction<exerciseType>> =
		myContextExercise.setCurrentExercise;

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

	const deleteOption = () => {
		setCurrentExercise((prev: exerciseType) => {
			const optArr = prev.options.filter((obj) => {
				return obj.id !== id;
			});
			return {
				...prev,
				options: optArr,
			};
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
			<>
				{canDelete ? (
					<IconButton onClick={deleteOption}>
						<FontAwesomeIcon icon={faTrash} id="deleteIcon" />
					</IconButton>
				) : null}
			</>
		</ListItemButton>
	);
}
