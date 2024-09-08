import { SetStateAction, Dispatch } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CoffeeIconSvg from 'assets/icons/coffee.svg';
import { Link as RouterLink } from 'react-router-dom';

export interface SimpleDialogProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SimpleDialog(props: SimpleDialogProps) {
	const { setOpen, open } = props;

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Dialog onClose={handleClose} open={open} sx={{ zIndex: 1 }}>
				<DialogTitle sx={{ color: 'red' }}>
					Te quedaste sin cafecitos
				</DialogTitle>
				<Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
					<CoffeeIcon />
					<Box sx={{ ml: 2 }}>
						<Typography variant="h6" sx={{ color: 'green' }}>
							Aprovechá el 50% de descuento en la tienda
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, pb: 2 }}>
					<Button
						onClick={handleClose}
						variant="contained"
						color="success"
						component={RouterLink}
						to={'/tienda/cafecitos'}
					>
						tienda
					</Button>
				</Box>
			</Dialog>
		</>
	);
}
function CoffeeIcon() {
	return <img src={CoffeeIconSvg} style={{ width: 50, height: 50 }} />;
}
