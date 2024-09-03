import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CoffeeIcon } from '../CoffeePrices/CoffeePrices';

export default function Payment() {
	return (
		<Box>
			<Typography>
				<strong>Pagá con mercado pago</strong>
			</Typography>
			<Box sx={{ pt: 2, pb: 2 }}>
				<Typography>
					<strong>Pasos a seguir.</strong>
				</Typography>
				<Box sx={{ mt: 1 }}>
					<ol>
						<li>
							<Typography>Pagá el pack que deseas adquirir.</Typography>
							<Box sx={{ mt: 2 }}>
								<PackListItem coffees="100" />
								<PackListItem coffees="1.000" />
								<PackListItem coffees="10.000" />
							</Box>
						</li>
						<li>
							<Typography>
								Una vez realizado el pago, recarga la tienda para ver los
								cambios en tus cafecitos.
							</Typography>
						</li>
					</ol>
				</Box>
			</Box>
		</Box>
	);
}

interface PackListItemProps {
	coffees: string;
}

function PackListItem(props: PackListItemProps) {
	const { coffees } = props;

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-around',
				gap: 1,
				mb: 3,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<CoffeeIcon />
				<Typography sx={{ ml: 1 }}>
					<strong>x{coffees}</strong>
				</Typography>
			</Box>
			<Button variant="contained" size="small" color="success">
				PAGAR
			</Button>
		</Box>
	);
}
