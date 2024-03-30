import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

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
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{menuItems.map((menuItem, i) => {
					return (
						<MenuItem key={i}>
							{menuItem.value !== undefined ? (
								<Link component={RouterLink} to={menuItem.value}>
									{menuItem.label}
								</Link>
							) : (
								<Box onClick={menuItem.onClick}>{menuItem.label}</Box>
							)}
						</MenuItem>
					);
				})}
			</Menu>
		</div>
	);
}
