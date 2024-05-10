import { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { contextExam, exerciseFeedback } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import { axiosPost } from 'app/utils/axios';
import { contextUi } from 'app/shared/interfaces/ui';
import { UiContext } from 'app/contexts/Ui';

interface CreateResultButtonProps {
	examId: string;
	examYear: number;
	examType: string;
	examNumber: number;
	examSubject: string;
	department: string;
	setScore: () => void;
	setDate: () => void;
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
	} = props;
	const { selectedOptions, exam, setExercisesFeedback, exercisesFeedback } =
		useContext<contextExam>(ExamContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const { examsUi, setExamsUi } = useContext<contextUi>(UiContext);

	const sendResult = async (): void => {
		setLoading(true);
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
			setLoading(false);
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
						success: exercises[i].argument,
						html: true,
					};
				} else {
					exArr[i] = {
						error: exercises[i].argument,
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

			const result: apiPostResponse = await axiosPost(
				'api/user/update/profile',
				data,
			);
			if (result.ok) {
				setExercisesFeedback(exArr);
				setExamsUi((prev) => {
					return {
						...prev,
						isPlayView: false,
					};
				});
				setScore(score);
				setDate(new Date().toString());
				localStorage.setItem(
					exam._id,
					JSON.stringify({
						exercisesFeedback: exArr,
						exam,
						examsUi: {
							isPlayView: false,
						},
						date: new Date().toString(),
						selectedOptions,
						score,
					}),
				);
				setLoading(false);
			} else {
				setError(result.error);
				if (result.errors) {
					result.errors.forEach((err: expressError): void => {
						console.log(err.path, err.msg);
					});
				}

				setLoading(false);
			}
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
						<Button
							disabled={loading}
							variant="contained"
							color="primary"
							onClick={sendResult}
						>
							finalizar examen
						</Button>
						<>
							{error !== '' ? (
								<Box sx={{ mt: 4 }}>
									<Typography color="error">{error}</Typography>
								</Box>
							) : null}
						</>
					</>
				)}
			</>
		</Box>
	);
}
