import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PackListItem from './PackListItem';
import { AuthContext } from 'app/contexts/Auth';
import { contextAuth } from 'app/shared/interfaces/auth';

export default function Payment() {
	const { auth } = useContext<contextAuth>(AuthContext);
	const [loading, setLoading] = useState<boolean>(false);

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
								<PackListItem
									loading={loading}
									setLoading={setLoading}
									coffees="100"
									id="coffees-100"
									email={auth.user.email}
									user_id={auth.user._id}
								/>
								<PackListItem
									loading={loading}
									setLoading={setLoading}
									coffees="1.000"
									id="coffees-1000"
									email={auth.user.email}
									user_id={auth.user._id}
								/>
								<PackListItem
									loading={loading}
									setLoading={setLoading}
									coffees="10.000"
									id="coffees-10000"
									email={auth.user.email}
									user_id={auth.user._id}
								/>
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
