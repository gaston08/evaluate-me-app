import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import video from '/public/assets/videos/demo_trainer.mp4';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minHeight: '80vh',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 0,
};

interface ModalVideoProps {
	open: boolean;
	handleClose: () => void;
}

export default function ModalVideo(props: ModalVideoProps) {
	const { open, handleClose } = props;
	const [disabled, setDisabled] = useState<boolean>(true);
	const [count, setCount] = useState<number>(10);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((prev) => prev - 1);
		}, 1000);

		return () => { clearInterval(interval); };
	}, []);

	useEffect(() => {
		if (count === 0) {
			setDisabled(false);
		}
	}, [count]);

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={style}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						position: 'relative',
						height: 'auto',
					}}
				>
					<Button
						variant="contained"
						onClick={handleClose}
						disabled={disabled}
						size="large"
						sx={{ position: 'absolute', bottom: 40, left: '20%', zIndex: 200 }}
					>
						{disabled ? count : 'CERRAR VIDEO'}
					</Button>
					<Box sx={{ flexGrow: 1, p: 1 }}>
						<Typography sx={{ color: 'green', mb: 1 }} variant="h6">
							¡Entrenamiento disponible!
						</Typography>
						<Button size="small" color="success" variant="contained">
							Entrenar
						</Button>
					</Box>
					<Box>
						<video
							autoPlay
							muted
							src={video}
							width="auto"
							height="550"
							loop
						></video>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
}

/**
 *
 *
 * */
