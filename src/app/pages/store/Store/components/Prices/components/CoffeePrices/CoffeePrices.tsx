import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CoffeeIconSvg from 'assets/icons/coffee.svg';

export const CoffeeIcon = () => {
	return <img src={CoffeeIconSvg} style={{ width: 40, height: 40 }} />;
};

interface CoffeePricesProps {
	coffees: string;
	originalPrice: string;
	disccountPrice: string;
}

export const CoffeePrices = (props: CoffeePricesProps) => {
	const { coffees, originalPrice, disccountPrice } = props;
	const hasDisccount = originalPrice !== disccountPrice;

	return (
		<Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
			<CoffeeIcon />
			<Box
				sx={{ ml: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
			>
				<Typography>
					<strong>x{coffees}</strong> cafecitos
				</Typography>
				<Fragment>
					{hasDisccount ? (
						<Fragment>
							<Typography
								sx={{ textDecoration: 'line-through', ml: 1, color: 'red' }}
							>
								${originalPrice}
							</Typography>
							<Typography sx={{ ml: 1, color: 'green' }}>
								${disccountPrice}
							</Typography>
							<Typography sx={{ color: 'green', ml: 1, mb: 0 }} variant="h6">
								Ahorrás un {100 - (disccountPrice / originalPrice) * 100}%
							</Typography>
						</Fragment>
					) : (
						<Typography sx={{ ml: 1 }}>${originalPrice}</Typography>
					)}
				</Fragment>
			</Box>
		</Box>
	);
};
