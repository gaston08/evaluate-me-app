import { Dispatch, useContext, Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';

interface OptionProps {
	title: string;
	isCorrect: boolean;
	onSelect: () => Dispatch<React.SetStateAction<Array<string>>>;
	canSelect: boolean;
	id: string;
	arrSelected: Array<string>;
	feedback: string;
}

export default function Option(props: OptionProps) {
	const { id, title, feedback, isCorrect, onSelect, arrSelected, canSelect } =
		props;
	const { auth, setAuth } = useContext<contextAuth>(AuthContext);
	const [selected, setSelected] = useState<boolean>(false);
	const theme = useTheme();

	const selectOption = () => {
		if (auth.coffees === 0) {
			alert('No coffees');
		} else {
			if (canSelect) {
				setSelected(true);
				if (isCorrect) {
					if (!arrSelected.includes(id)) {
						onSelect((prev: Array<string>) => [...prev, id]);
					}
				} else {
					setAuth((prev) => {
						return {
							...prev,
							coffees: prev.coffees - 1,
						};
					});
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
