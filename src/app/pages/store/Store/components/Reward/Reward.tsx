import { useState, SetStateAction, Dispatch } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import LinearProgress, {
	linearProgressClasses,
} from '@mui/material/LinearProgress';
import { axiosPost } from 'app/utils/axios';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { authType } from 'app/shared/interfaces/auth';
import { setUpAuth } from 'app/utils/auth';
import HelpGuide from '../HelpGuide';
import CoffeeIconSvg from 'assets/icons/coffee.svg';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: theme.palette.grey[200],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: '#1a90ff',
	},
}));

interface RewardProps {
	title: string;
	subtitle: string;
	coffees: string;
	invitations: string;
	user_invitation: number;
	received_invitations: Array<number>;
	id: string;
	setAuth: Dispatch<SetStateAction<authType>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
	canReceive: boolean;
	userCoffees: number;
	invitation_code: number;
}

export default function Reward(props: RewardProps) {
	const {
		title,
		subtitle,
		coffees,
		invitations,
		user_invitation,
		received_invitations,
		id,
		setAuth,
		setOpen,
		canReceive,
		userCoffees,
		invitation_code,
	} = props;
	const [loading, setLoading] = useState<boolean>(false);
	const [progress] = useState<number>(() => {
		if (invitations === 0) {
			return 100;
		} else {
			if (user_invitation >= invitations) {
				return 100;
			} else {
				return (user_invitation / invitations) * 100;
			}
		}
	});

	console.log(progress);

	const getReward = () => {
		setLoading(true);
		const arr = [...received_invitations];
		arr.push(id);

		axiosPost('api/user/update/profile', {
			received_invitations: arr,
			coffees: userCoffees + coffees,
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
				<Typography variant="h5" component="div">
					{title}
				</Typography>
				<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
					{subtitle}
				</Typography>
				<BorderLinearProgress variant="determinate" value={progress} />
				<>
					{progress === 100 ? (
						<Typography variant="body1" sx={{ color: 'green', mt: 1 }}>
							Completado!
						</Typography>
					) : (
						<Typography variant="body2">
							{user_invitation}/{invitations} invitaciones
						</Typography>
					)}
				</>
				<Box sx={{ mt: 2, mb: 1, display: 'flex', alignItems: 'center' }}>
					<CoffeeIcon />
					<Box sx={{ ml: 1 }}>x{coffees} cafecitos</Box>
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
					disabled={!(invitations <= user_invitation) || loading || !canReceive}
				>
					Recibir recompensa
				</Button>
			</CardActions>
			<HelpGuide invitation_code={invitation_code} />
		</Card>
	);
}

function CoffeeIcon() {
	return <img src={CoffeeIconSvg} style={{ width: 40, height: 40 }} />;
}
