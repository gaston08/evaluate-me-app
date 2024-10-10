import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Exercise from '../Exercise';
import { exerciseType } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';
import { useLocation } from 'react-router-dom';

import DialogLogin from './components/DialogLogin';

export default function Exercises() {
	const [open, setOpen] = useState<boolean>(false);
	const { exam } = useContext<contextExam>(ExamContext);
	const [warningAlert, setWarningAlert] = useState<string>(false);
	const location = useLocation();

	useEffect(() => {
		if (
			location.pathname.includes(
				'/tests/biologia-e-introduccion-a-la-biologia-celular-b-(91)/',
			) ||
			location.pathname.includes(
				'/tests/biologia-e-introduccion-a-la-biologia-celular-(54)/',
			)
		) {
			setWarningAlert(true);
		}
	}, [location.pathname]);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div>
				<>
					{exam.exercises.map((exercise: exerciseType, idx: number) => {
						return (
							<Box sx={{ width: '100%', mb: 5 }} key={exercise.id}>
								<Typography
									variant="h6"
									color="primary"
									gutterBottom
									sx={{ mt: 2 }}
									className="exercise-number"
								>
									Ejercicio {idx + 1}
								</Typography>
								<Exercise
									idx={idx}
									exercise={exercise}
									isPlayView={true}
									warningAlert={warningAlert}
								/>
							</Box>
						);
					})}
				</>
			</div>

			<DialogLogin open={open} onClose={handleClose} />
		</>
	);
}
