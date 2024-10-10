import Box from '@mui/material/Box';
import { optionType } from 'app/shared/interfaces/exam';
import { useTheme } from '@mui/material/styles';

interface OptionItemProps {
	isSelected: boolean;
	option: optionType;
}

export default function OptionItem(props: OptionItemProps) {
	const { isSelected, isCorrect, option } = props;
	const theme = useTheme();

	let bgColor: string = '';
	let color: string = '';

	if (isSelected) {
		if (isCorrect) {
			bgColor = theme.palette.success.main;
			color = theme.palette.success.contrastText;
		} else {
			bgColor = theme.palette.error.main;
			color = theme.palette.success.contrastText;
		}
	} else {
		bgColor = 'transparent';
	}

	return (
		<Box
			sx={{
				backgroundColor: bgColor,
				display: 'flex',
				justifyContent: 'space-between',
				p: 2,
				borderBottom: '1px solid #ccc',
				color,
			}}
		>
			<div dangerouslySetInnerHTML={{ __html: option.title }}></div>
		</Box>
	);
}
