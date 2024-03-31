import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as RouterLink } from 'react-router-dom';

interface MenuButtonProps {
	text: string;
	icon: React.Component | undefined;
	menuItems: Array<{
		label: string;
		value: string | undefined;
		onClick: () => void;
	}>;
}

export default function MenuButton(props: MenuButtonProps) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { text, icon, menuItems } = props;

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button onClick={handleMenu}>
				<Typography>{text}</Typography>

				{icon !== undefined ? (
					<Box sx={{ ml: 1 }}>
						<FontAwesomeIcon icon={icon} />
					</Box>
				) : null}
			</Button>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{menuItems.map((menuItem, i) => {
					if (menuItem.value !== undefined) {
						return (
							<MenuItem
								key={i}
								onClick={handleClose}
								component={RouterLink}
								to={menuItem.value}
							>
								{menuItem.label}
							</MenuItem>
						);
					} else {
						return (
							<MenuItem key={i}>
								<Box onClick={menuItem.onClick}>{menuItem.label}</Box>
							</MenuItem>
						);
					}
				})}
			</Menu>
		</div>
	);
}
