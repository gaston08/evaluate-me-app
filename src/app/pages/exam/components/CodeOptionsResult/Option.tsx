import Box from '@mui/material/Box';

interface OptionProps {
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

export default function Option(props: OptionProps) {
	const { isSelected, option } = props;
	const { title, python_code } = option;

	const selectOption = () => {
		console.log('seleccionar opción');
	};

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
				onClick={selectOption}
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
