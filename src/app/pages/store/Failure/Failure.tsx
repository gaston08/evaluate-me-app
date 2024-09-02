import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
					Intentá pagar con otro método de pago, si el problema persiste
					comunicate con el equipo de ubaparciales.
				</Typography>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					size="small"
					variant="contained"
					color="error"
					component={RouterLink}
					to="/tienda/cafecitos"
				>
					volver a la tienda
				</Button>
			</CardActions>
		</Card>
	);
}
