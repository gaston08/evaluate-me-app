import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import WhatsappButton from 'app/components/WhatsappButton';

export default function Failure() {
	return (
		<Card sx={{ minWidth: 275, background: 'white' }}>
			<CardContent>
				<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
					Ha ocurrido un problema!
				</Typography>
				<Typography variant="h5" component="div">
					No pudimos procesar tu pago.
				</Typography>
				{/**<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>$500</Typography>**/}
				<Typography variant="body2">
					Intentá pagar con otro método de pago. <br />
					<br />
					Si el problema persiste comunicate con el equipo de ubaparciales
					haciendo click en el ícono de whatsapp.
					<br />
					<br />O envíanos un correo:{' '}
					<a href="mailto:ubaparciales@gmail.com">ubaparciales@gmail.com</a>
				</Typography>
			</CardContent>
			<Box sx={{ pb: 2 }}>
				<WhatsappButton />
			</Box>
		</Card>
	);
}
