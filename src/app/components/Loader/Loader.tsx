import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	outline: 'none',
};

interface LoaderProps {
	open: boolean;
}

export default function Loader(props: LoaderProps) {
	const { open } = props;

	return (
		<Fragment>
			{open && (
				<Modal
					open={true}
					sx={{
						backgroundColor: 'white',
					}}
				>
					<Box sx={style}>
						<div className="loader"></div>
					</Box>
				</Modal>
			)}
		</Fragment>
	);
}
