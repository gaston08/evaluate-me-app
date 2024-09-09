import { useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { contextExam, exerciseFeedback } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import { axiosPost } from 'app/utils/axios';
import { contextUi } from 'app/shared/interfaces/ui';
import { UiContext } from 'app/contexts/Ui';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';

interface CreateResultButtonProps {
	examId: string;
	examYear: number;
	examType: string;
	examNumber: number;
	examSubject: string;
	department: string;
	setScore: () => void;
	setDate: () => void;
	setShowSpinner: () => void;
}

export default function CreateResultButton(props: CreateResultButtonProps) {
	const {
		examYear,
		examType,
		examNumber,
		examSubject,
		department,
		setDate,
		setScore,
		setShowSpinner,
	} = props;
	const { selectedOptions, exam, setExercisesFeedback, exercisesFeedback } =
		useContext<contextExam>(ExamContext);
	const { examsUi, setExamsUi } = useContext<contextUi>(UiContext);
	const { auth } = useContext<contextAuth>(AuthContext);

	const sendResult = (): void => {
		setShowSpinner(true);
		let sumScore: number = 0;

		const newErrArr = JSON.parse(
			JSON.stringify(exercisesFeedback),
		) as Array<exerciseFeedback>;
		let hasError: boolean = false;

		const exercises = exam.exercises;

		for (let i = 0; i < exercises.length; i++) {
			for (let j = 0; j < exercises[i].correctOptions.length; j++) {
				if (
					exercises[i].correctOptions[j].length !== selectedOptions[i][j].length
				) {
					hasError = true;
					if (exercises[i].correctOptions[j].length === 1) {
						newErrArr[i] = {
							error: `Debes seleccionar 1 respuesta.`,
							success: '',
							html: false,
						};
					} else {
						newErrArr[i] = {
							error: `Debes seleccionar ${exercises[i].correctOptions[j].length} respuestas.`,
							success: '',
							html: false,
						};
					}
					j = exercises[i].correctOptions.length;
				} else {
					newErrArr[i] = { error: '', success: '', html: false };
				}
			}
		}

		if (hasError) {
			setExercisesFeedback(newErrArr);
			setShowSpinner(false);
		} else {
			const exArr = Array.from({ length: exercises.length }, () => []);
			for (let i = 0; i < exercises.length; i++) {
				const isCorrect = exercises[i].correctOptions.every((arrOpt, a) => {
					if (
						arrOpt.sort().join(',') === selectedOptions[i][a].sort().join(',')
					) {
						return true;
					} else {
						return false;
					}
				});

				if (isCorrect) {
					sumScore += Number(exercises[i].pts);
					exArr[i] = {
						error: '',
						// esto luego cambiar en caso de que hayan varios feedbacks
						success: exercises[i].argument[0].text,
						html: true,
					};
				} else {
					exArr[i] = {
						// esto luego cambiar en caso de que hayan varios feedbacks
						error: exercises[i].argument[0].text,
						success: '',
						html: true,
					};
				}
			}

			const score = sumScore.toFixed(2);

			const data = {
				score: {
					score,
					date: new Date().toString(),
					department,
					exam_year: examYear,
					exam_type: examType,
					exam_number: examNumber,
					exam_subject: examSubject,
				},
			};

			setExercisesFeedback(exArr);
			setExamsUi((prev) => {
				return {
					...prev,
					isPlayView: false,
				};
			});
			setScore(Number(score));
			setDate(new Date().toString());

			if (auth.isLoggedIn) {
				axiosPost('api/user/update/profile', data)
					.then((result: apiPostResponse) => {
						if (!result.ok) {
							if (result.error) {
								console.log(result.error);
							}
							if (result.errors) {
								result.errors.forEach((err: expressError): void => {
									console.log(err.msg);
								});
							}
						}
					})
					.catch(console.error);
			}
			setTimeout(() => {
				setShowSpinner(false);
			}, 2000);
		}
	};

	return (
		<Box>
			<>
				{!examsUi.isPlayView ? null : (
					<>
						<>
							{exercisesFeedback.some((ex) => ex.error !== '') ? (
								<Box sx={{ mb: 3 }}>
									<Typography color="error">
										Asegurate de completar todos los ejercicios.
									</Typography>
								</Box>
							) : null}
						</>
						<Button variant="contained" color="primary" onClick={sendResult}>
							finalizar examen
						</Button>
					</>
				)}
			</>
		</Box>
	);
}
