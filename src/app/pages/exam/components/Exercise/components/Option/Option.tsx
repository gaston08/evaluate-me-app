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
		isCorrect,
	} = props;
	const { setSelectedOptions } = useContext<contextExam>(ExamContext);
	const { examsUi } = useContext<contextUi>(UiContext);
	const isPlayView = examsUi.isPlayView;
	const theme = useTheme();

	const selectOption = () => {
		if (isPlayView) {
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

	let bgColor;
	let hoverColor;
	let color = '';

	if (isPlayView) {
		if (isSelected) {
			hoverColor = '#90caf9';
			bgColor = '#90caf9';
		} else {
			bgColor = 'transparent';
			hoverColor = '#e3f2fd';
		}
	} else {
		if (isSelected) {
			if (isCorrect) {
				bgColor = theme.palette.success.main;
				hoverColor = theme.palette.success.main;
				color = theme.palette.success.contrastText;
			} else {
				bgColor = theme.palette.error.main;
				hoverColor = theme.palette.error.main;
				color = theme.palette.error.contrastText;
			}
		} else {
			bgColor = 'transparent';
			hoverColor = 'transparent';
		}
	}

	return (
		<>
			{isPlayView ? (
				<ListItemButton
					sx={{
						'&:hover, &.Mui-selected, &.Mui-selected:hover': {
							backgroundColor: hoverColor,
						},
						backgroundColor: bgColor,
						display: 'flex',
						justifyContent: 'space-between',
						cursor: 'pointer',
					}}
					onClick={selectOption}
				>
					<div dangerouslySetInnerHTML={{ __html: title }}></div>
				</ListItemButton>
			) : (
				<ListItemButton
					sx={{
						'&:hover, &.Mui-selected, &.Mui-selected:hover': {
							backgroundColor: hoverColor,
						},
						color,
						backgroundColor: bgColor,
						display: 'flex',
						justifyContent: 'space-between',
						cursor: 'auto',
					}}
					onClick={selectOption}
				>
					<div dangerouslySetInnerHTML={{ __html: title }}></div>
				</ListItemButton>
			)}
		</>
	);
}
