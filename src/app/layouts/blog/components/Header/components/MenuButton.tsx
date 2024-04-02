import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';

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
	const { text, icon, menuItems } = props;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const theme = useTheme();

	const matches = useMediaQuery(theme.breakpoints.down('sm'));

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<>
				{matches ? (
					<IconButton>
						<FontAwesomeIcon icon={icon} onClick={handleMenu} />
					</IconButton>
				) : (
					<Button onClick={handleMenu}>
						{icon !== undefined ? (
							<Box sx={{ mr: 1 }}>
								<FontAwesomeIcon icon={icon} />
							</Box>
						) : null}
						<Typography>{text}</Typography>
					</Button>
				)}
			</>
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
