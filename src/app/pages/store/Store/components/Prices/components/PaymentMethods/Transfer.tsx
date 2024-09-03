import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Transfer() {
	return (
		<Box>
			<Typography>
				<strong>Transferencia</strong>
			</Typography>
			<Box sx={{ pt: 2, pb: 2 }}>
				<Typography>
					<strong>Pasos a seguir.</strong>
				</Typography>
				<ol>
					<li>
						<Typography>
							Realizá una transferencia con el monto que se indica en el pack de
							cafecitos que deseas adquirir.
						</Typography>
						<Box
							sx={{
								background: '#eeefff',
								pl: 1,
								pr: 1,
								pb: 3,
								pt: 3,
								mt: 3,
								mb: 3,
							}}
						>
							<Typography>
								CVU: <strong>0000003100029654626932</strong>
							</Typography>
							<Typography>
								Alias: <strong>gas.mp.ton</strong>
							</Typography>
						</Box>
					</li>
					<li>
						<Typography sx={{ mb: 1 }}>
							Envía el comprobante por Whatsapp al número{' '}
							<strong>+54 3884542738</strong> indicando tu correo con el que te
							registraste en la plataforma. O en el siguiente enlace:
						</Typography>
						<Typography
							component={RouterLink}
							to="https://wa.me/543884542738"
							target="_blank"
						>
							https://wa.me/543884542738
						</Typography>
					</li>
					<li>
						<Typography sx={{ mt: 2 }}>
							Te responderemos de inmediato para acreditarte tus cafecitos.
						</Typography>
					</li>
				</ol>
			</Box>
		</Box>
	);
}
