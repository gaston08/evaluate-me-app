import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Success() {
	return (
		<Card sx={{ minWidth: 275, background: 'white' }}>
			<CardContent>
				<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
					Felicitaciones!
				</Typography>
				<Typography variant="h5" component="div">
					Tu pago se ha procesado con éxito.
				</Typography>
				{/**<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>$500</Typography>**/}
				<Typography variant="body2">
					En un instante se te acreditarán los cafecitos, chequea en la tienda
					que se te hayan acreditado.
				</Typography>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					size="small"
					variant="contained"
					color="success"
					component={RouterLink}
					to="/tienda/cafecitos"
				>
					volver a la tienda
				</Button>
			</CardActions>
		</Card>
	);
}
