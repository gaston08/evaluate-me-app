import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { apiGetResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import NoExamFound from '../components/NoExamFound';
import Exercises from '../components/Exercises';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam, examType } from 'app/shared/interfaces/exam';
import { subjects } from 'app/shared/data/exam';

export default function ViewResult() {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [subject, setSubject] = useState<string>('');
	const { exam, setExam, setSelectedOptions, setExercisesFeedback } =
		useContext<contextExam>(ExamContext);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const result: apiGetResponse = await axiosGet(
				`api/results/get:${params.id}`,
			);
			if (result.ok) {
				const results = result.data.results;
				setSubject(() => {
					const ex: examType = results.examId;
					return subjects.find((sub) => sub.value === ex.subject).label;
				});

				const exArr = Array.from(
					{ length: results.examId.exercises.length },
					() => [],
				);

				setSelectedOptions(results.answers);

				const exercises = results.examId.exercises;

				for (let i = 0; i < exercises.length; i++) {
					for (let j = 0; j < exercises[i].correctOptions.length; j++) {
						if (
							exercises[i].correctOptions[j].sort().join(',') ===
							results.answers[i][j].sort().join(',')
						) {
							exArr[i] = {
								error: '',
								success: exercises[i].argument,
							};
						} else {
							exArr[i] = {
								error: exercises[i].argument,
								success: '',
							};
						}
					}
				}

				setExercisesFeedback(exArr);

				setExam(result.data.results.examId);

				console.log(result.data.results);

				setLoading(false);
			} else {
				if (result.errors) {
					const errorsArr: Array<string> = result.errors.map((err) => {
						return err.msg;
					});

					setErrors(errorsArr);
				} else if (result.error) {
					setErrors([result.error]);
				}
				setLoading(false);
			}
		}

		fetchData().then().catch(console.error);
	}, []);

	return (
		<>
			{loading ? (
				<Typography variant="h3">Cargando...</Typography>
			) : (
				<>
					{errors.length !== 0 ? (
						<NoExamFound errors={errors} />
					) : (
						<>
							<Box sx={{ mb: 5 }}>
								<Typography variant="h5" sx={{ mb: 2 }}>
									{subject}, {exam.year}
								</Typography>
								<Typography variant="h5">
									{exam.type}, TEMA {exam.exam_number}
								</Typography>
							</Box>
							<Exercises />
						</>
					)}
				</>
			)}
		</>
	);
}
