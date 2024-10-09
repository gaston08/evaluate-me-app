import {
	useState,
	Fragment,
	useContext,
	Dispatch,
	SetStateAction,
} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import CoffeeIconSvg from 'assets/icons/coffee.svg';
import NoCoffeesDialog from 'app/components/NoCoffeesDialog';

import { contextAuth, userType } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';
import { axiosPost } from 'app/utils/axios';
import { decodeToken } from 'react-jwt';

import { setUpAuth } from 'app/utils/auth';

interface InitialFormProps {
	labels: {
		subject: string;
		examType: string;
		department: string;
	};
	setExamState: Dispatch<
		SetStateAction<{
			showInitialForm: boolean;
			showSolveExam: boolean;
			showExamResult: boolean;
		}>
	>;
}

function CoffeeIcon() {
	return <img src={CoffeeIconSvg} style={{ width: 30, height: 30 }} />;
}

export default function InitialForm(props: InitialFormProps) {
	const { labels, setExamState, id } = props;
	const [loading, setLoading] = useState<boolean>(false);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const { setAuth } = useContext<contextAuth>(AuthContext);

	const enableExam = async () => {
		setLoading(true);
		try {
			const result = await axiosPost('api/user/refresh-token-db');
			if (result.ok) {
				const user = decodeToken(result.data.token) as userType;
				if (user.coffees < 5) {
					setOpenDialog(true);
					setLoading(false);
					return;
				} else {
					const change_coffees = -5;
					const apiResponse = await axiosPost('api/user/update/profile', {
						coffees: change_coffees,
					});

					if (apiResponse.ok) {
						setUpAuth(result.data.token, true, setAuth);
						setLoading(false);

						setExamState({
							showInitialForm: false,
							showSolveExam: true,
							showExamResult: false,
						});

						localStorage.setItem(
							`${id}_result`,
							JSON.stringify({
								enabled: true,
								completed: false,
								selected_options: [],
								options_to_select: 0,
							}),
						);
					} else {
						setUpAuth('', false, setAuth);
					}
				}
			} else {
				setUpAuth('', false, setAuth);
			}
		} catch (err) {
			console.log(err);
		}

		setLoading(false);
	};

	return (
		<Box>
			<Alert icon={false} severity="success">
				<AlertTitle>Información del exámen</AlertTitle>
				<Box sx={{ mt: 2 }}>
					<Typography>
						<strong>Materia</strong>: {labels.subject}
					</Typography>
					<Typography>
						<strong>Tipo de exámen</strong>: {labels.examType}
					</Typography>
					<Typography>
						<strong>TEMA</strong>: {labels.examNumber}
					</Typography>
					<Typography>
						<strong>Cátedra</strong>: {labels.department}
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Typography>
							<strong>Costo</strong>:
						</Typography>
						<CoffeeIcon />
						<Typography>
							<strong>x5 cafecitos</strong>
						</Typography>
					</Box>
					<Box sx={{ mt: 3 }}>
						<Button
							color="success"
							variant="contained"
							size="small"
							onClick={() => {
								enableExam().catch(console.error);
							}}
							disabled={loading}
						>
							Confirmar
						</Button>
					</Box>
				</Box>
			</Alert>
			<Fragment>
				<NoCoffeesDialog open={openDialog} setOpen={setOpenDialog} />
			</Fragment>
		</Box>
	);
}
