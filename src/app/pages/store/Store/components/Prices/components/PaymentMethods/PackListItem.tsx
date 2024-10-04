import { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CoffeeIcon } from '../CoffeePrices/CoffeePrices';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { axiosPost } from 'app/utils/axios';
import { coffees_prices } from '../../prices';

interface PackListItemProps {
	coffees: string;
	id: string;
	setLoading: Dispatch<SetStateAction<boolean>>;
	loading: boolean;
	email: string;
	user_id: string;
}

export default function PackListItem(props: PackListItemProps) {
	const { coffees, id, loading, setLoading, email, user_id } = props;

	const coffee_info = coffees_prices.find((coff) => {
		if (coff.id === id) {
			return true;
		}
	});

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
			<Button
				onClick={() => {
					setLoading(true);
					const data = {
						email,
						coffees: coffee_info.coffees,
						user_id,
						items: [
							{
								currency_id: 'ARS',
								title: coffee_info.title,
								unit_price: coffee_info.disccount_price,
								quantity: 1,
								description: coffee_info.description,
								id: coffee_info.id,
								category_id: coffee_info.category_id,
							},
						],
					};
					axiosPost('api/transaction/create', data)
						.then((result: apiPostResponse) => {
							if (result.ok) {
								window.location.href = result.data.preference.init_point;
							} else {
								console.log(result);
								if (result.error) {
									console.log(result.error);
								}
								if (result.errors) {
									result.errors.forEach((err: expressError): void => {
										console.log(err.msg);
									});
								}
								setLoading(false);
							}
						})
						.catch((err) => {
							console.log(err);
							setLoading(false);
						});
				}}
				variant="contained"
				size="small"
				color="success"
				disabled={loading}
			>
				PAGAR
			</Button>
		</Box>
	);
}
