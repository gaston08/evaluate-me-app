import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { apiGetResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import NoExamFound from '../components/NoExamFound';
import CreateResultButton from './components/CreateResultButton';
//import ShareButtons from './components/ShareButtons';
import ExamResult from './components/ExamResult';
import Exercises from '../components/Exercises';
import { ExamContext } from 'app/contexts/Exam';
import { decodeToken } from 'react-jwt';
import {
	contextExam,
	examType as examInterface,
} from 'app/shared/interfaces/exam';
import { exam_types } from 'app/shared/exams/exam';
import { subjects, selectInterface } from 'app/shared/exams/ubaxxi';
import { contextUi } from 'app/shared/interfaces/ui';
import { UiContext } from 'app/contexts/Ui';
import Loader from 'app/components/Loader';
import { setUpExam } from './utils';
import CoffeeIconSvg from 'assets/icons/coffee.svg';
import { setUpAuth } from 'app/utils/auth';
import { axiosPost } from 'app/utils/axios';
import { contextAuth, userType } from 'app/shared/interfaces/auth';
import { AuthContext } from 'app/contexts/Auth';
import NoCoffeesDialog from 'app/components/NoCoffeesDialog';

function CoffeeIcon() {
	return <img src={CoffeeIconSvg} style={{ width: 30, height: 30 }} />;
}

interface examInfoInterface {
	subject: string;
	examType: string;
	department: string;
}

export default function View() {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(true);
	const [showSpinner, setShowSpinner] = useState<boolean>(false);
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
	const theme = useTheme();
	const { setAuth } = useContext<contextAuth>(AuthContext);
	const [canSolve, setCanSolve] = useState<boolean>(false);
	const [enabling, setEnabling] = useState<boolean>(false);
	const [openDialog, setOpenDialog] = useState<boolean>(false);

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
					const subject: selectInterface = subjects.find(
						(sub) => sub.value === ex.subject,
					);
					const examType: string = exam_types.find(
						(typ) => typ.value === ex.type,
					).label;
					const department: string = subject.departments.find(
						(dep) => dep.value === ex.department,
					).label;
					return {
						subject: subject.label,
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
				.then(() => {
					setLoading(false);
				})
				.catch(console.error);
		} else {
			setExamInfo(() => {
				const subject: selectInterface = subjects.find(
					(sub) => sub.value === exam_data.subject,
				);
				const examType: string = exam_types.find(
					(typ) => typ.value === exam_data.type,
				).label;
				const department: string = subject.departments.find(
					(dep) => dep.value === exam_data.department,
				).label;
				return {
					subject: subject.label,
					examType,
					department,
				};
			});
			setExam(exam_data);

			setUpExam(
				exam_data.exercises,
				setSelectedOptions,
				setExercisesFeedback,
				setExamsUi,
			);
			setLoading(false);
		}
	}, [params.id]);

	const cleanExam = () => {
		setShowSpinner(true);
		localStorage.removeItem(`${exam._id}-results`);
		setCanSolve(false);
		setUpExam(
			exam.exercises,
			setSelectedOptions,
			setExercisesFeedback,
			setExamsUi,
		);
		setTimeout(() => {
			setShowSpinner(false);
		}, 1000);
	};

	const enableExam = async () => {
		setEnabling(true);
		try {
			const result = await axiosPost('api/user/refresh-token-db');
			if (result.ok) {
				const user = decodeToken(result.data.token) as userType;
				if (user.coffees < 5) {
					setOpenDialog(true);
					setEnabling(false);
					return;
				} else {
					const change_coffees = -5;
					const apiResponse = await axiosPost('api/user/update/profile', {
						coffees: change_coffees,
					});

					if (apiResponse.ok) {
						setUpAuth(result.data.token, true, setAuth);
						setLoading(false);
						setCanSolve(true);
						setShowSpinner(true);
						setTimeout(() => {
							setShowSpinner(false);
						}, 2000);
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

		setEnabling(false);
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
							<>
								{canSolve ? (
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
								) : null}
							</>
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
							<Box>
								{!canSolve ? (
									<Box>
										<Alert icon={false} severity="success">
											<AlertTitle>Información del exámen</AlertTitle>
											<Box sx={{ mt: 2 }}>
												<Typography>
													<strong>Materia</strong>: {examInfo.subject}
												</Typography>
												<Typography>
													<strong>Tipo de exámen</strong>: {examInfo.examType}
												</Typography>
												<Typography>
													<strong>TEMA</strong>: {exam.exam_number}
												</Typography>
												<Typography>
													<strong>Cátedra</strong>: {examInfo.department}
												</Typography>
												<Box
													sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
												>
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
														disabled={enabling}
													>
														Confirmar
													</Button>
												</Box>
											</Box>
										</Alert>
									</Box>
								) : (
									<Exercises />
								)}
							</Box>
							<>
								{canSolve ? (
									<Box sx={{ m: 3 }}>
										<CreateResultButton
											examYear={exam.year}
											examType={exam.type}
											examNumber={exam.exam_number}
											examSubject={exam.subject}
											department={exam.department}
											setScore={setScore}
											setDate={setDate}
											setShowSpinner={setShowSpinner}
										/>
									</Box>
								) : null}
							</>
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
			<>
				<NoCoffeesDialog open={openDialog} setOpen={setOpenDialog} />
			</>
		</>
	);
}
