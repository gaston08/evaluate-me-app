import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	outline: 'none',
};

export default function BasicModal() {
	return (
		<div>
			<Modal open={true}>
				<Box sx={style}>
					<div className="loader"></div>
				</Box>
			</Modal>
		</div>
	);
}
