import * as React from 'react';
import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface OptionProps {
	title: string;
	isCorrect: boolean;
	onSelect: () => React.Dispatch<React.SetStateAction<Array<string>>>;
	canSelect: boolean;
	id: string;
	arrSelected: Array<string>;
	feedback: string;
}

export default function Option(props: OptionProps) {
	const { id, title, feedback, isCorrect, onSelect, arrSelected, canSelect } =
		props;
	const [selected, setSelected] = useState<boolean>(false);
	const theme = useTheme();

	const selectOption = () => {
		if (canSelect) {
			setSelected(true);
			if (isCorrect) {
				if (!arrSelected.includes(id)) {
					onSelect((prev: Array<string>) => [...prev, id]);
				}
			}
		}
	};

	let bgColor;
	let hoverColor;
	let color = '';

	if (selected) {
		if (isCorrect) {
			bgColor = theme.palette.success.main;
			hoverColor = theme.palette.success.main;
			color = theme.palette.success.contrastText;
		} else {
			bgColor = theme.palette.error.main;
			hoverColor = theme.palette.error.main;
			color = theme.palette.error.contrastText;
		}
	}

	return (
		<Fragment>
			<Box
				sx={{
					'&:hover, &.Mui-selected, &.Mui-selected:hover': {
						backgroundColor: hoverColor,
					},
					color,
					backgroundColor: bgColor,
					display: 'flex',
					justifyContent: 'space-between',
					cursor: 'auto',
					p: 2,
					borderRadius: 1,
				}}
				onClick={selectOption}
			>
				<div dangerouslySetInnerHTML={{ __html: title }}></div>
			</Box>
			<Box>
				{selected && !isCorrect ? (
					<Alert severity="error">
						<AlertTitle>Incorrecto!</AlertTitle>
						{feedback !== '' ? (
							<div
								dangerouslySetInnerHTML={{
									__html: title,
								}}
							></div>
						) : null}
					</Alert>
				) : null}
			</Box>
		</Fragment>
	);
}
