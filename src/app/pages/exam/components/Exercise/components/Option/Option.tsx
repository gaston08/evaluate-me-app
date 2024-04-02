import { useContext } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';
import { contextExam } from 'app/shared/interfaces/exam';
import { contextUi } from 'app/shared/interfaces/ui';
import { ExamContext } from 'app/contexts/Exam';
import { UiContext } from 'app/contexts/Ui';

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
	const { setSelectedOptions } = useContext<contextExam>(ExamContext);
	const { examsUi } = useContext<contextUi>(UiContext);
	const canSelect = examsUi.canSelect;
	const theme = useTheme();

	const selectOption = () => {
		if (canSelect) {
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
		}
	};

	return (
		<ListItemButton
			sx={{
				'&:hover, &.Mui-selected, &.Mui-selected:hover': {
					backgroundColor: canSelect
						? '#eee'
						: isSelected
							? theme.custom.background.main
							: 'transparent',
				},
				backgroundColor: isSelected
					? `${theme.custom.background.main}!important`
					: null,
				display: 'flex',
				justifyContent: 'space-between',
				cursor: canSelect ? 'pointer' : 'auto',
			}}
			onClick={selectOption}
		>
			<div dangerouslySetInnerHTML={{ __html: title }}></div>
		</ListItemButton>
	);
}
