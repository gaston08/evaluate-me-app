import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Pending() {
	return (
		<Card sx={{ minWidth: 275, background: 'white' }}>
			<CardContent>
				<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
					Aguarda un momento!
				</Typography>
				<Typography variant="h5" component="div">
					Tu pago está siendo procesado por tu banco.
				</Typography>
				{/**<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>$500</Typography>**/}
				<Typography variant="body2">
					El pago aún no fue liberado, te informaremos cuando esté listo.
					Comunicate con tu banco si se demora en acreditar.
				</Typography>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					size="small"
					variant="contained"
					color="warning"
					component={RouterLink}
					to="/tienda/cafecitos"
				>
					volver a la tienda
				</Button>
			</CardActions>
		</Card>
	);
}
