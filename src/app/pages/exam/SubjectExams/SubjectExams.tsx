import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import { apiGetAllSubjects } from 'app/shared/interfaces/api-response';

import { axiosGet } from 'app/utils/axios';
import { exam_types } from 'app/shared/exams/exam';
import { subjects } from 'app/shared/exams/ubaxxi';
import Faq from 'app/components/Faq';
import ModalVideo from './components/ModalVideo';

interface exam {
	[key: string]: {
		[key: string]: {
			[key: string]: {
				[key: string]: string;
			};
		};
	};
}

export default function SubjectExams({ subjectId }) {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [exams, setExams] = useState<exam>({});
	const location = useLocation();
	const [open, setOpen] = useState(() => {
		const watched = localStorage.getItem('watched_trainer');
		if (watched === null) {
			return true;
		} else {
			const date = new Date(watched);
			const ONE_HOUR = 60 * 60 * 1000; /* ms */

			if (new Date() - date > ONE_HOUR) {
				return true;
			} else {
				return false;
			}
		}
	});
	const handleClose = () => {
		localStorage.setItem('watched_trainer', new Date().toString());
		setOpen(false);
	};

	const subject = subjects.find((sub) => sub.value === subjectId);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const result: apiGetAllSubjects = await axiosGet(
				`api/exam/get:${subjectId}`,
			);
			if (result.ok) {
				setExams(result.data.exams);
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
		if (params.id === undefined) {
			console.log('fetch exams');
			fetchData().then().catch(console.error);
		}
	}, [subjectId, location.key]);

	if (loading) {
		return <Typography variant="h3">Cargando...</Typography>;
	}

	return (
		<Box>
			<Box sx={{ minHeight: 350 }}>
				<Box sx={{ mb: 3 }}>
					<Typography variant="h5" sx={{ mb: 2, color: 'green' }}>
						Aumenta 88% tus chances de aprobar ingresando al modo entrenamiento.
					</Typography>
					<Button
						component={RouterLink}
						to={`/entrenamiento/${subjectId}`}
						variant="contained"
						color="success"
					>
						INGRESAR
					</Button>
				</Box>
				<Box>
					<Typography variant="h5" component="h1">
						Parciales de {subject.label.toLowerCase()}.
					</Typography>
				</Box>
				{errors.length !== 0 ? (
					<Box>
						<Alert severity="error">
							<AlertTitle>No se pudo cargar la página.</AlertTitle>
							{errors.map((err: string, i: number) => {
								return (
									<Typography key={i} variant="h6">
										{err}
									</Typography>
								);
							})}
						</Alert>
					</Box>
				) : (
					<>
						{Object.keys(exams).length === 0 ? (
							<>
								<Typography sx={{ mt: 2 }} variant="h6">
									Estamos subiendo ejercicios para este exámen, volvé a ingresar
									días antes del exámen.
								</Typography>
							</>
						) : (
							<>
								{Object.keys(exams)
									.reverse()
									.map((year) => {
										return (
											<Box key={year}>
												<p>{year}</p>
												<Box>
													{Object.keys(exams[year]).map((type) => {
														const labelType = exam_types.find(
															(t) => t.value === type,
														);
														return (
															<Box key={type}>
																<Box sx={{ ml: 2 }}>
																	{Object.keys(exams[year][type]).map(
																		(department) => {
																			return (
																				<Box key={department}>
																					<p>
																						<strong>
																							{labelType
																								? labelType.label
																								: type}
																							,
																						</strong>{' '}
																						{
																							subject.departments.find(
																								(dep) =>
																									dep.value === department,
																							).label
																						}
																					</p>
																					<Grid
																						gap={1}
																						container
																						sx={{ ml: 2 }}
																					>
																						{Object.keys(
																							exams[year][type][department],
																						).map((examNumber) => {
																							return (
																								<Grid item key={examNumber}>
																									<Link
																										component={RouterLink}
																										to={
																											exams[year][type][
																												department
																											][examNumber]
																										}
																										sx={{ mr: 4 }}
																									>
																										TEMA {examNumber}{' '}
																									</Link>
																								</Grid>
																							);
																						})}
																					</Grid>
																				</Box>
																			);
																		},
																	)}
																</Box>
															</Box>
														);
													})}
												</Box>
											</Box>
										);
									})}
							</>
						)}
					</>
				)}
			</Box>
			<Box>
				<Faq />
			</Box>
			{open ? <ModalVideo open={open} handleClose={handleClose} /> : null}
		</Box>
	);
}
