import { Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

export default function TokensMenu() {
	return (
		<Fragment>
			<Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<CoffeeIcon />
				<Box sx={{ ml: 2 }}>Tienes 15 cafecitos</Box>
			</Toolbar>
		</Fragment>
	);
}

function CoffeeIcon() {
	return <img src={'/icons/coffee.svg'} style={{ width: 40, height: 40 }} />;
}
