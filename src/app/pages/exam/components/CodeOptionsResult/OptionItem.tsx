import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

interface OptionItemProps {
	isSelected: boolean;
	option: {
		title: string;
		id: string;
		feedback: string;
		code: boolean;
		python_code: boolean;
		text: string;
	};
}

export default function OptionItem(props: OptionItemProps) {
	const { isSelected, isCorrect, option } = props;
	const { title, python_code } = option;
	const theme = useTheme();

	let bgColor: sring = '';

	if (isSelected) {
		if (isCorrect) {
			bgColor = theme.palette.success.main;
		} else {
			bgColor = theme.palette.error.main;
		}
	} else {
		bgColor = 'transparent';
	}

	return (
		<>
			<Box
				component="tr"
				sx={{
					width: '100%',
					border: bgColor !== 'transparent' ? `3px solid ${bgColor}` : '',
					borderBottom: bgColor === 'transparent' ? `2px solid black` : '',
				}}
				className="highlight-code"
			>
				<td>
					{python_code ? (
						<Box
							className="lightbulb"
							dangerouslySetInnerHTML={{
								__html: title,
							}}
						></Box>
					) : (
						<Box
							className="lightbulb"
							dangerouslySetInnerHTML={{
								__html: title,
							}}
							sx={{ p: 2 }}
						></Box>
					)}
				</td>
			</Box>
		</>
	);
}
