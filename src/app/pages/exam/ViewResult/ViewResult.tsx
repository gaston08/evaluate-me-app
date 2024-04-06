import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { apiGetResponse, resultType } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import NoExamFound from '../components/NoExamFound';
import Exercises from '../components/Exercises';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam, examType } from 'app/shared/interfaces/exam';
import { subjects } from 'app/shared/data/exam';
import { contextUi } from 'app/shared/interfaces/ui';
import { UiContext } from 'app/contexts/Ui';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ViewResult() {
	const params = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [subject, setSubject] = useState<string>('');
	const { exam, setExam, setSelectedOptions, setExercisesFeedback } =
		useContext<contextExam>(ExamContext);
	const { setExamsUi } = useContext<contextUi>(UiContext);
	const [result, setResult] = useState<resultType>({});
	const [date, setDate] = useState<string>('');
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
								<Typography
									variant="h4"
									color="#424242"
									sx={{ color: theme.palette.info.main, mt: 2 }}
								>
									NOTA: {result.score}/10
								</Typography>
							</Box>
							<Exercises />
							<Box
								sx={{
									display: 'flex',
									width: '100%',
									justifyContent: 'center',
								}}
							>
								<Box>
									<Box sx={{ mt: 1, mb: 4 }}>
										<Button
											variant="outlined"
											onClick={() => {
												navigate(-1);
											}}
										>
											Rehacer examen
										</Button>
									</Box>
									<Typography variant="h6">Compartir exámen.</Typography>
									<ShareButtons result={result} subject={subject} />
								</Box>
							</Box>
						</>
					)}
				</>
			)}
		</>
	);
}

interface ShareButtonsProp {
	result: resultType;
	subject: string;
}

function ShareButtons(props: ShareButtonsProp) {
	const result = props.result;
	const subject = props.subject;

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.up('sm'));

	const shareTextWhatsapp = `https://api.whatsapp.com/send?text=https://ubaparciales.com %0A%0A📚Acabo de resolver ${result.exam_type}, TEMA ${result.exam_number}, ${subject}.%0A%0ANota: ${result.score} 🤓`;

	return (
		<Box
			sx={{
				mt: 2,
				display: 'flex',
				justifyContent: 'center',
				mb: matches ? 3 : 0,
			}}
		>
			<IconButton
				component={RouterLink}
				to={shareTextWhatsapp}
				target="_blank"
				sx={{
					color: 'green',
					border: '1px solid green',
					borderRadius: '100%',
					'& svg': {
						width: 30,
						height: 30,
					},
				}}
			>
				<svg
					aria-hidden="true"
					focusable="false"
					data-prefix="fab"
					data-icon="whatsapp"
					className="svg-inline--fa fa-whatsapp "
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 448 512"
				>
					<path
						fill="currentColor"
						d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
					></path>
				</svg>
			</IconButton>
		</Box>
	);
}
