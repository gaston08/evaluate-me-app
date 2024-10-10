import Box from '@mui/material/Box';

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
	selectOption: (optionId: string, index: string) => void;
	index: string;
}

export default function OptionItem(props: OptionItemProps) {
	const { isSelected, option, selectOption, index } = props;
	const { title, python_code } = option;

	let bgColor;

	if (isSelected) {
		bgColor = '#90caf9';
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
				onClick={() => {
					selectOption(option.id, index);
				}}
			>
				<td>
					<>
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
					</>
				</td>
			</Box>
		</>
	);
}
