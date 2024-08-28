import { Fragment, useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { Link as RouterLink } from 'react-router-dom';
import { axiosPost } from 'app/utils/axios';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth } from 'app/shared/interfaces/auth';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { setUpAuth } from 'app/utils/auth';

interface TokensMenuProps {
	coffees: number;
}

export default function TokensMenu(props: TokensMenuProps) {
	const { coffees } = props;
	const [text, setText] = useState<string>('');
	const { setAuth, auth } = useContext<contextAuth>(AuthContext);

	useEffect(() => {
		if (coffees === 0) {
			setText('Te quedaste sin cafecitos');
		} else if (coffees <= 10) {
			setText('Te quedan pocos cafecitos ' + coffees);
		} else {
			setText(`Tenes ${coffees} cafecitos`);
		}
	}, [coffees]);

	useEffect(() => {
		if (auth.coffees % 10 === 0) {
			axiosPost('api/user/update/profile', {
				fullName: auth.user.fullName,
				username: auth.user.username,
				email: auth.user.email,
				coffees: auth.coffees,
			})
				.then((result: apiPostResponse) => {
					if (result.ok) {
						setUpAuth(result.data.token, true, setAuth);
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
					}
				})
				.catch(console.error);
		}
	}, [auth.coffees]);

	return (
		<Fragment>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					display: 'flex',
					p: 1,
					alignItems: 'center',
				}}
			>
				<CoffeeIcon />
				<Box sx={{ ml: 2, color: coffees < 10 ? 'red' : 'inherit' }}>
					{text}
				</Box>
			</Box>
			<Box
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					display: 'flex',
					p: 1,
					alignItems: 'center',
					color: 'green',
				}}
			>
				50% DE DESCUENTO SOLO POR HOY
			</Box>
			<Box
				to="/tienda/cafecitos"
				component={RouterLink}
				sx={{
					borderBottom: 1,
					borderColor: 'divider',
					cursor: 'pointer',
					'&:hover': {
						backgroundColor: '#eee',
					},
					display: 'flex',
					p: 1,
					alignItems: 'center',
				}}
			>
				<StoreIcon /> <Box sx={{ ml: 2 }}>IR A LA TIENDA</Box>
			</Box>
		</Fragment>
	);
}

function CoffeeIcon() {
	return <img src={'/icons/coffee.svg'} style={{ width: 40, height: 40 }} />;
}

function StoreIcon() {
	return <img src={'/icons/store.svg'} style={{ width: 30, height: 30 }} />;
}
