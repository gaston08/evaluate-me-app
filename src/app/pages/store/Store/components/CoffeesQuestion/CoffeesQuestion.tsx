import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CoffeesQuestion() {
	return (
		<Card sx={{ minWidth: 275, mb: 3, backgroundColor: 'white' }}>
			<CardContent sx={{ pb: 0 }}>
				<Typography variant="body1" sx={{ fontWeight: '500' }}>
					¿Qué son los cafecitos?
				</Typography>
				<Typography sx={{ color: 'text.secondary' }} variant="body2">
					Los cafecitos son tokens que te permiten realizar exámenes dentro de
					la plataforma.
				</Typography>
				<Typography sx={{ color: 'text.secondary', mb: 1.5 }} variant="body2">
					También te sirven para practicar, utilizando el modo entrenamiento.
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: '500' }}>
					¿Cómo consigo cafecitos?
				</Typography>
				<Typography sx={{ color: 'text.secondary' }} variant="body2">
					Podes comprar cafecitos siguiendo las instrucciones de Comprá
					cafecitos!
				</Typography>
				<Typography sx={{ color: 'text.secondary' }} variant="body2">
					También podes conseguir cafecitos gratis recomendando la plataforma a
					tus compañeros de la uba, como se te indica más abajo.
				</Typography>
			</CardContent>
		</Card>
	);
}
