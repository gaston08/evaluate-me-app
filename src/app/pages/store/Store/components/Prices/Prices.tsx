import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CoffeeIcon, CoffeePrices } from './CoffeePrices';

export default function Prices() {
	return (
		<Card sx={{ minWidth: 275, mt: 5, backgroundColor: 'white' }}>
			<CardContent sx={{ pb: 0 }}>
				<Typography variant="h5" component="div">
					Compra instantánea
				</Typography>
				<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
					Realizá una transferencia y recibí tus cafecitos al instante.
				</Typography>
				{/* normal */}
				<Box sx={{ mt: 2, mb: 4, display: 'flex', alignItems: 'end' }}>
					<CoffeeIcon />
					<Box sx={{ ml: 1 }}>
						<strong>x100</strong> cafecitos ($500)
					</Box>
				</Box>
				{/* disccount 40%*/}
				<CoffeePrices
					coffees="1.000"
					originalPrice="5.000"
					disccountPrice="3.000"
					percentage="40"
				/>

				{/* disccount 80%*/}
				<CoffeePrices
					coffees="10.000"
					originalPrice="50.000"
					disccountPrice="11.000"
					percentage="80"
				/>
			</CardContent>
			<Box sx={{ p: 2 }}>
				<Typography>
					<strong>Pasos a seguir.</strong>
				</Typography>
				<ol>
					<li>
						<Typography>
							Realizá una transferencia al alias gas.mp.ton con el monto
							indicado en cada pack.
						</Typography>
					</li>
					<li>
						<Typography>
							Envia el comprobante por whatsapp, indicando tu número
						</Typography>
					</li>
				</ol>
			</Box>
		</Card>
	);
}
