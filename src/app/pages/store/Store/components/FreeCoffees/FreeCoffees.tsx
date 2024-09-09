import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { axiosPost } from 'app/utils/axios';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { authType } from 'app/shared/interfaces/auth';
import { setUpAuth } from 'app/utils/auth';
import CoffeeIconSvg from 'assets/icons/coffee.svg';

interface RewardProps {
	coffees: string;
	id: string;
	setAuth: Dispatch<SetStateAction<authType>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
	userCoffees: number;
}

export default function FreeCoffees(props: RewardProps) {
	const { setAuth, setOpen } = props;
	const [loading, setLoading] = useState<boolean>(false);
	const [date, setDate] = useState<Date>(new Date());

	useEffect(() => {
		const free_coffees_minute = localStorage.getItem('free_coffees_minute');
		if (free_coffees_minute === null) {
			const date = new Date().getTime() + 1000 * 60 * 60;
			localStorage.setItem('free_coffees_minute', new Date(date).toString());
		} else {
			setDate(new Date(free_coffees_minute));
		}

		setInterval(() => {
			console.log(date - new Date().getTime() / 1000 / 60);
		}, 1000);
	}, []);

	const getReward = () => {
		setLoading(true);

		axiosPost('api/user/update/profile', {
			//received_invitations: arr,
			//offees: coffees,
		})
			.then((result: apiPostResponse) => {
				if (result.ok) {
					setUpAuth(result.data.token, true, setAuth);
					setLoading(false);
				} else {
					setUpAuth('', false, setAuth);
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
			.catch(console.error);

		setOpen(true);
	};

	return (
		<Card sx={{ minWidth: 275, backgroundColor: 'white' }}>
			<CardContent sx={{ pb: 0 }}>
				<Box sx={{ mt: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
					<Typography sx={{ color: 'text.secondary' }}>HOLA</Typography>
					<CoffeeIcon />
					<Box sx={{ ml: 1 }}>x5 cafecitos</Box>
				</Box>
			</CardContent>
			<CardActions>
				<Button
					color="success"
					variant="contained"
					size="small"
					onClick={() => {
						getReward();
					}}
					disabled={loading}
				>
					Recibir recompensa
				</Button>
			</CardActions>
		</Card>
	);
}

function CoffeeIcon() {
	return <img src={CoffeeIconSvg} style={{ width: 40, height: 40 }} />;
}
