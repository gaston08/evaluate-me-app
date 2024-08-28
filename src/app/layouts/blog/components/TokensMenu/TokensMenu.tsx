import { Fragment, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';

interface TokensMenuProps {
	coffees: number;
}

export default function TokensMenu(props: TokensMenuProps) {
	const { coffees } = props;
	const [text, setText] = useState<string>('');

	useEffect(() => {
		if (coffees === 0) {
			setText('Te quedaste sin cafecitos');
		} else if (coffees <= 10) {
			setText('Te quedan pocos cafecitos ' + coffees);
		} else {
			setText(`Tenes ${coffees} cafecitos`);
		}
	}, [coffees]);

	return (
		<Fragment>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					display: 'flex',
					p: 1,
					alignItems: 'center',
				}}
			>
				<CoffeeIcon />
				<Box sx={{ ml: 2, color: coffees < 10 ? 'red' : 'inherit' }}>
					{text}
				</Box>
			</Box>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					display: 'flex',
					p: 1,
					alignItems: 'center',
					color: 'green',
				}}
			>
				50% DE DESCUENTO SOLO POR HOY
			</Box>
			<Box
				to="/tienda/cafecitos"
				component={RouterLink}
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					cursor: 'pointer',
					'&:hover': {
						backgroundColor: '#eee',
					},
					display: 'flex',
					p: 1,
					alignItems: 'center',
				}}
			>
				<StoreIcon /> <Box sx={{ ml: 2 }}>IR A LA TIENDA</Box>
			</Box>
		</Fragment>
	);
}

function CoffeeIcon() {
	return <img src={'/icons/coffee.svg'} style={{ width: 40, height: 40 }} />;
}

function StoreIcon() {
	return <img src={'/icons/store.svg'} style={{ width: 30, height: 30 }} />;
}
