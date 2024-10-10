import Box from '@mui/material/Box';
import { optionType } from 'app/shared/interfaces/exam';

interface OptionItemProps {
	isSelected: boolean;
	option: optionType;
	selectOption: (a: string) => void;
}

export default function OptionItem(props: OptionItemProps) {
	const { isSelected, option, selectOption, index } = props;

	let bgColor;
	let hoverColor;

	if (isSelected) {
		hoverColor = '#90caf9';
		bgColor = '#90caf9';
	} else {
		bgColor = 'transparent';
		hoverColor = '#e3f2fd';
	}

	return (
		<Box
			sx={{
				'&:hover, &.Mui-selected, &.Mui-selected:hover': {
					backgroundColor: hoverColor,
				},
				backgroundColor: bgColor,
				display: 'flex',
				justifyContent: 'space-between',
				cursor: 'pointer',
				p: 2,
				borderBottom: '1px solid #ccc',
			}}
			onClick={() => {
				selectOption(option.id, index);
			}}
		>
			<div dangerouslySetInnerHTML={{ __html: option.title }}></div>
		</Box>
	);
}
