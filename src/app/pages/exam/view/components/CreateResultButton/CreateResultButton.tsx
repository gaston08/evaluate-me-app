import { useState, useContext } from 'react';
import { decodeToken } from 'react-jwt';
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

interface CreateResultButtonProps {
	examId: string;
	examYear: number;
	examType: string;
	examNumber: number;
	examSubject: string;
}

export default function CreateResultButton(props: CreateResultButtonProps) {
	const { examId, examYear, examType, examNumber, examSubject } = props;
	const {
		selectedOptions,
		exam: { exercises },
		setExercisesFeedback,
		exercisesFeedback,
	} = useContext<contextExam>(ExamContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const sendResult = async (): void => {
		setLoading(true);
		const access_token = localStorage.getItem('access_token');
		const userId = decodeToken(access_token)._id as string;
		let sumScore: number = 0;

		const newErrArr = JSON.parse(
			JSON.stringify(exercisesFeedback),
		) as Array<exerciseFeedback>;
		let hasError: boolean = false;

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
						};
					} else {
						newErrArr[i] = {
							error: `Debes seleccionar ${exercises[i].correctOptions[j].length} respuestas.`,
							success: '',
						};
					}
				} else {
					newErrArr[i] = { error: '', success: '' };
				}
			}
		}

		if (hasError) {
			setExercisesFeedback(newErrArr);
			setLoading(false);
		} else {
			for (let i = 0; i < exercises.length; i++) {
				// each exercises
				const isCorrect = exercises[i].correctOptions.every((arrOpt, a) => {
					if (
						arrOpt.sort().join(',') === selectedOptions[i][a].sort().join(',')
					) {
						newErrArr[i] = {
							error: '',
							success: exercises[i].argument,
						};
						return true;
					} else {
						newErrArr[i] = {
							error: exercises[i].argument,
							success: '',
						};
						return false;
					}
				});

				if (isCorrect) {
					sumScore += Number(exercises[i].pts);
				}
			}

			const data = {
				userId,
				examId,
				answers: selectedOptions,
				score: sumScore,
				date: new Date().toString(),
				exam_year: examYear,
				exam_type: examType,
				exam_number: examNumber,
				exam_subject: examSubject,
			};
			const result: apiPostResponse = await axiosPost(
				'api/result/create',
				data,
			);
			if (result.ok) {
				setExercisesFeedback(newErrArr);
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
			<Button
				disabled={loading}
				variant="contained"
				color="primary"
				onClick={sendResult}
			>
				Enviar exámen.
			</Button>
			<>
				{error !== '' ? (
					<Box sx={{ mt: 4 }}>
						<Typography color="error">{error}</Typography>
					</Box>
				) : null}
			</>
		</Box>
	);
}
