import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { apiGetResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import NoExamFound from '../components/NoExamFound';
import CreateResultButton from './components/CreateResultButton';
import Exercises from '../components/Exercises';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam, examType } from 'app/shared/interfaces/exam';
import { subjects } from 'app/shared/data/exam';
import { contextUi } from 'app/shared/interfaces/ui';
import { UiContext } from 'app/contexts/Ui';
import { contextAuth } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';

export default function View() {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const { exam, setExam, setSelectedOptions, setExercisesFeedback } =
		useContext<contextExam>(ExamContext);
	const [subject, setSubject] = useState<string>('');
	const { setExamsUi } = useContext<contextUi>(UiContext);
	const { auth } = useContext<contextAuth>(AuthContext);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const result: apiGetResponse = await axiosGet(
				`api/exam/find:${params.id}`,
			);
			if (result.ok) {
				setSubject(() => {
					const ex: examType = result.data.exam;
					return subjects.find((sub) => sub.value === ex.subject).label;
				});

				const exArr = Array.from(
					{ length: result.data.exam.exercises.length },
					() => [],
				);

				for (let i = 0; i < exArr.length; i++) {
					exArr[i] = Array.from(
						{
							length: result.data.exam.exercises[i].options.length,
						},
						() => [],
					);
				}

				setSelectedOptions(
					JSON.parse(JSON.stringify(exArr)) as Array<Array<Array<string>>>,
				);

				const exercisesFeedbackArr = Array.from(
					{ length: result.data.exam.exercises.length },
					() => {
						return {
							success: '',
							error: '',
							html: false,
						};
					},
				);

				setExercisesFeedback(exercisesFeedbackArr);
				setExamsUi((prev) => {
					return {
						...prev,
						isPlayView: true,
					};
				});
				setExam(result.data.exam);
				console.log(result.data.exam);
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
	}, [params.id]);

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
							<Box sx={{ m: 3 }}>
								{auth.isLoggedIn ? (
									<CreateResultButton
										examId={exam._id}
										examYear={exam.year}
										examType={exam.type}
										examNumber={exam.exam_number}
										examSubject={exam.subject}
									/>
								) : null}
							</Box>
						</>
					)}
				</>
			)}
		</>
	);
}
