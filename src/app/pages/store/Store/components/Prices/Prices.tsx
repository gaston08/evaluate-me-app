import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CoffeePrices } from './components/CoffeePrices/CoffeePrices';
import PaymentMethods from './components/PaymentMethods';

import { coffees_prices } from './prices';

export default function Prices() {
	return (
		<Card sx={{ minWidth: 275, mt: 4, backgroundColor: 'white' }}>
			<CardContent sx={{ pb: 0 }}>
				<Typography variant="h5" component="div">
					Comprá cafecitos!
				</Typography>
				<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
					Realizá una transferencia y recibí tus cafecitos al instante.
				</Typography>

				<Fragment>
					{coffees_prices.map((price) => {
						return (
							<CoffeePrices
								coffees={price.coffees}
								originalPrice={price.unit_price}
								disccountPrice={price.disccount_price}
								key={price.id}
							/>
						);
					})}
				</Fragment>
			</CardContent>
			<Box>
				<PaymentMethods />
			</Box>
		</Card>
	);
}
