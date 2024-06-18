import * as React from 'react';
import { useState, Fragment } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { useTheme } from '@mui/material/styles';

interface OptionProps {
	title: string;
	isCorrect: boolean;
	onSelect: () => React.Dispatch<React.SetStateAction<Array<string>>>;
	canSelect: boolean;
	id: string;
	arrSelected: Array<string>;
}

export default function Option(props: OptionProps) {
	const { id, title, isCorrect, onSelect, arrSelected, canSelect } = props;
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
		</Fragment>
	);
}
