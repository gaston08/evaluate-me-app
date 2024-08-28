import { Fragment, useContext, useState, useEffect } from 'react';
import Reward from './components/Reward';
import Box from '@mui/material/Box';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth } from 'app/shared/interfaces/auth';
import SimpleDialog from './components/Reward/components/SimpleDialog';

export default function Store() {
	const { auth, setAuth } = useContext<contextAuth>(AuthContext);
	const [current, setCurrent] = useState(invitations_challenges.length - 1);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		for (let i = 0; i < invitations_challenges.length; i++) {
			if (
				!auth.user.received_invitations.includes(invitations_challenges[i].id)
			) {
				setCurrent(i);
				i = invitations_challenges.length;
			}
		}
	}, [auth.user]);

	return (
		<Fragment>
			<Box sx={{ pb: 2 }}>
				<Reward
					key={invitations_challenges[current].id}
					id={invitations_challenges[current].id}
					title={invitations_challenges[current].body.title}
					subtitle={invitations_challenges[current].body.subtitle}
					invitations={invitations_challenges[current].invitations}
					quantity={invitations_challenges[current].coffees}
					user_invitation={auth.user.invitations}
					received_invitations={auth.user.received_invitations}
					setAuth={setAuth}
					setOpen={setOpen}
					canReceive={
						!auth.user.received_invitations.includes(
							invitations_challenges[current].id,
						)
					}
				/>
			</Box>
			<SimpleDialog open={open} setOpen={setOpen} />
		</Fragment>
	);
}

const invitations_challenges = [
	{
		id: 'free-register',
		invitations: 0,
		coffees: 10,
		body: {
			title: 'Ganá ',
			subtitle: 'Registrá tu cuenta',
		},
	},
	{
		id: 'invitations-1',
		invitations: 1,
		coffees: 10,
		body: {
			title: 'Ganá cafecitos gratis',
			subtitle: 'Invitá a un amigo y recibí grandes recompensas',
		},
	},
	{
		id: 'invitations-4',
		invitations: 4,
		coffees: 10,
		body: {
			title: 'Ganá cafecitos gratis',
			subtitle: 'Invitá a 4 amigos y recibí grandes recompensas',
		},
	},
	{
		id: 'invitations-10',
		invitations: 10,
		coffees: 10,
		body: {
			title: 'Ganá cafecitos gratis',
			subtitle: 'Invitá a 10 amigos y recibí grandes recompensas',
		},
	},
];
