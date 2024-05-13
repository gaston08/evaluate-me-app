import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Exercise from '../Exercise';
import { exerciseType } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';

import DialogLogin from './components/DialogLogin';

export default function Exercises() {
	const [open, setOpen] = useState<boolean>(false);
	const { exam, exercisesFeedback } = useContext<contextExam>(ExamContext);
	const { auth } = useContext<contextAuth>(AuthContext);

	const handleClick = () => {
		if (!auth.isLoggedIn) {
			//setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div onClick={handleClick}>
				<>
					{exam.exercises.map((exercise: exerciseType, idx: number) => {
						return (
							<Box sx={{ width: '100%', mb: 5 }} key={exercise.id}>
								<Exercise
									idx={idx}
									exercise={exercise}
									isPlayView={true}
									exerciseFeedback={exercisesFeedback[idx]}
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
