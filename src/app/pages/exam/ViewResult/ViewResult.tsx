import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { apiGetResponse, resultType } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import NoExamFound from '../components/NoExamFound';
import Exercises from '../components/Exercises';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam, examType } from 'app/shared/interfaces/exam';
import { subjects } from 'app/shared/data/exam';
import { contextUi } from 'app/shared/interfaces/ui';
import { UiContext } from 'app/contexts/Ui';

export default function ViewResult() {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [subject, setSubject] = useState<string>('');
	const { exam, setExam, setSelectedOptions, setExercisesFeedback } =
		useContext<contextExam>(ExamContext);
	const { setExamsUi } = useContext<contextUi>(UiContext);
	const [result, setResult] = useState<resultType>({});
	const [date, setDate] = useState<string>('');

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const result: apiGetResponse = await axiosGet(
				`api/results/get:${params.id}`,
			);
			if (result.ok) {
				const results = result.data.result;
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
				}

				setExercisesFeedback(exArr);

				setExamsUi((prev) => {
					return {
						...prev,
						isPlayView: false,
					};
				});

				setExam(result.data.result.examId);
				setResult(result.data.result);

				// make date
				const a = new Date(result.data.result.date);
				const day = a.getDate();
				const month = new Intl.DateTimeFormat('es', { month: 'long' }).format(
					a,
				);
				const upperMonth = month.charAt(0).toUpperCase() + month.slice(1);
				const year = a.getFullYear();
				const fullDate = day + ' de ' + upperMonth + ' de ' + year;
				setDate(fullDate);

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
							<Box sx={{ mb: 3 }}>
								<Typography variant="h5" sx={{ mb: 2 }}>
									{subject}, {exam.year}
								</Typography>
								<Typography variant="h5">
									{exam.type}, TEMA {exam.exam_number}
								</Typography>
							</Box>
							<Box sx={{ mb: 3 }}>
								<Typography variant="h6" color="gray">
									{date}
								</Typography>
								<Typography variant="h5" color="#424242">
									NOTA: {result.score}/10
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
