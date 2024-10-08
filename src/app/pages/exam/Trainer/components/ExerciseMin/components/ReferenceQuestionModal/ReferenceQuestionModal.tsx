import { Fragment } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '100%',
	maxWidth: 700,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 2,
	fontSize: 16,
	overflow: 'scroll',
	height: '80%',
	display: 'block',
};

interface ReferenceQuestionModalProps {
	open: boolean;
	handleClose: () => void;
	referenceQuestion: Array<string>;
}

export default function ReferenceQuestionModal(
	props: ReferenceQuestionModalProps,
) {
	const { open, handleClose, referenceQuestion } = props;
	const theme = useTheme();

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Fragment>
						{referenceQuestion.map((question, i) => {
							return (
								<Box key={i}>
									<Paper
										elevation={0}
										sx={{
											p: 2,
											background:
												theme.custom !== undefined
													? theme.custom.background.light
													: '',
										}}
									>
										<div
											dangerouslySetInnerHTML={{
												__html: question,
											}}
											className="tiptap"
										></div>
									</Paper>
								</Box>
							);
						})}
					</Fragment>
					<Box sx={{ pl: 2 }}>
						<Button variant="contained" onClick={handleClose}>
							Cerrar
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
