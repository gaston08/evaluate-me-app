import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { apiGetResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import NoExamFound from '../components/NoExamFound';
import CreateResultButton from './components/CreateResultButton';
//import ShareButtons from './components/ShareButtons';
import ExamResult from './components/ExamResult';
import Exercises from '../components/Exercises';
import { ExamContext } from 'app/contexts/Exam';
import {
	contextExam,
	examType as examInterface,
	examData,
} from 'app/shared/interfaces/exam';
import { exam_types, departments } from 'app/shared/exams/exam';
import { subjects } from 'app/shared/exams/ubaxxi';
import { contextUi } from 'app/shared/interfaces/ui';
import { UiContext } from 'app/contexts/Ui';
import Loader from 'app/components/Loader';
import { setUpExam } from './utils';

interface examInfoInterface {
	subject: string;
	examType: string;
	department: string;
}

export default function View() {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(true);
	const [showSpinner, setShowSpinner] = useState<boolean>(true);
	const [errors, setErrors] = useState<Array<string>>([]);
	const { exam, setExam, setSelectedOptions, setExercisesFeedback } =
		useContext<contextExam>(ExamContext);
	const [examInfo, setExamInfo] = useState<examInfoInterface>({
		subject: '',
		examType: '',
		department: '',
	});
	const { examsUi, setExamsUi } = useContext<contextUi>(UiContext);
	const [score, setScore] = useState<number>(0);
	const [date, setDate] = useState<string>('');
	const [start, setStart] = useState(new Date());
	const theme = useTheme();

	useEffect(() => {
		if (!loading) {
			window.scrollTo(0, 0);
		}
	}, [loading]);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const result: apiGetResponse = await axiosGet(
				`api/exam/find:${params.id}`,
			);
			if (result.ok) {
				const ex: examInterface = result.data.exam;
				setExamInfo(() => {
					const subject: string = subjects.find(
						(sub) => sub.value === ex.subject,
					).label;
					const examType: string = exam_types.find(
						(typ) => typ.value === ex.type,
					).label;
					const department: string = departments.find(
						(dep) => dep.value === ex.department,
					).label;
					return {
						subject,
						examType,
						department,
					};
				});

				setUpExam(
					result.data.exam.exercises,
					setSelectedOptions,
					setExercisesFeedback,
					setExamsUi,
				);

				setExam(result.data.exam);
				localStorage.setItem(
					result.data.exam._id,
					JSON.stringify(result.data.exam),
				);

				return result.data.exam;
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

		const exam_data = JSON.parse(
			localStorage.getItem(params.id),
		) as examInterface | null;

		if (exam_data === null) {
			fetchData()
				.then((exam_data) => {
					const exam_result = JSON.parse(
						localStorage.getItem(`${params.id}-results`),
					) as examData | null;
					if (exam_result !== null) {
						setExamsUi({ isPlayView: false });
						setExercisesFeedback(() => {
							return exam_result.exercisesFeedback.map((ex, i) => {
								if (ex) {
									return {
										success: exam_data.exercises[i].argument,
										error: '',
										html: true,
									};
								} else {
									return {
										success: '',
										error: exam_data.exercises[i].argument,
										html: true,
									};
								}
							});
						});
						setDate(exam_result.date);
						setSelectedOptions(exam_result.selectedOptions);
						setScore(Number(exam_result.score));
					}
					setLoading(false);
				})
				.catch(console.error);
		} else {
			setExamInfo(() => {
				const subject: string = subjects.find(
					(sub) => sub.value === exam_data.subject,
				).label;
				const examType: string = exam_types.find(
					(typ) => typ.value === exam_data.type,
				).label;
				const department: string = departments.find(
					(dep) => dep.value === exam_data.department,
				).label;
				return {
					subject,
					examType,
					department,
				};
			});
			setExam(exam_data);

			const exam_result = JSON.parse(
				localStorage.getItem(`${params.id}-results`),
			) as examData | null;
			if (exam_result === null) {
				setUpExam(
					exam_data.exercises,
					setSelectedOptions,
					setExercisesFeedback,
					setExamsUi,
				);
			} else {
				setExamsUi({ isPlayView: false });
				setExercisesFeedback(() => {
					return exam_result.exercisesFeedback.map((ex, i) => {
						if (ex) {
							return {
								success: exam_data.exercises[i].argument,
								error: '',
								html: true,
							};
						} else {
							return {
								success: '',
								error: exam_data.exercises[i].argument,
								html: true,
							};
						}
					});
				});
				setDate(exam_result.date);
				setSelectedOptions(exam_result.selectedOptions);
				setScore(Number(exam_result.score));
			}
			setLoading(false);
		}
	}, [params.id]);

	useEffect(() => {
		if (!loading) {
			let time = 1400;
			time -= new Date() - start;

			if (time > 0) {
				setTimeout(() => {
					setShowSpinner(false);
				}, time);
			} else {
				setShowSpinner(false);
			}
		} else {
			setStart(new Date());
			setShowSpinner(true);
		}
	}, [loading]);

	const cleanExam = () => {
		setLoading(true);
		setUpExam(
			exam.exercises,
			setSelectedOptions,
			setExercisesFeedback,
			setExamsUi,
		);
		setTimeout(() => {
			setLoading(false);
		}, 100);
	};

	return (
		<>
			{showSpinner ? (
				<>
					<Loader />
				</>
			) : (
				<>
					{errors.length !== 0 ? (
						<NoExamFound errors={errors} />
					) : (
						<>
							<Box
								sx={{
									mb: 3,
								}}
							>
								<Typography
									variant="h5"
									sx={{
										mb: 2,
										color: theme.palette.text.secondary,
									}}
								>
									{examInfo.subject}, {exam.year}
								</Typography>
								<Typography variant="h5">
									{examInfo.examType}, TEMA {exam.exam_number},{' '}
									{examInfo.department}
								</Typography>
							</Box>
							<>
								{
									// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
									!examsUi.isPlayView && !showSpinner && !loading ? (
										<ExamResult
											score={score}
											totalPts={exam.totalPts}
											date={date}
										/>
									) : null
								}
							</>
							<>
								{!examsUi.isPlayView ? (
									<Box sx={{ mt: 1, mb: 4 }}>
										<Button variant="outlined" onClick={cleanExam}>
											Rehacer examen
										</Button>
									</Box>
								) : null}
							</>
							<Exercises />
							<Box sx={{ m: 3 }}>
								<CreateResultButton
									examYear={exam.year}
									examType={exam.type}
									examNumber={exam.exam_number}
									examSubject={exam.subject}
									department={exam.department}
									setScore={setScore}
									setDate={setDate}
									setLoading={setLoading}
								/>
							</Box>
							<>
								{!examsUi.isPlayView ? (
									<Box>
										<Box sx={{ mt: 1, mb: 4 }}>
											<Button variant="outlined" onClick={cleanExam}>
												Rehacer examen
											</Button>
										</Box>
										{/*

										<Typography variant="h6">Compartir exámen.</Typography>
										<ShareButtons
											subject={exam.subject}
											examType={exam.type}
											examNumber={exam.exam_number}
											score={score}
										/>
											*/}
									</Box>
								) : null}
							</>
						</>
					)}
				</>
			)}
		</>
	);
}
