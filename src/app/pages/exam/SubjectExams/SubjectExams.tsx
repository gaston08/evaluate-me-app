import { useEffect, useState } from 'react';
import {
	Link as RouterLink,
	useParams,
	useLocation,
	Outlet,
} from 'react-router-dom';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
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

interface exam {
	[key: string]: {
		[key: string]: {
			[key: string]: {
				[key: string]: string;
			};
		};
	};
}

export default function SubjectExams() {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [exams, setExams] = useState<exam>({});
	const location = useLocation();

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const result: apiGetAllSubjects = await axiosGet(
				`api/exam/get:${params.subject}`,
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
			fetchData().then().catch(console.error);
		}
	}, [params.subject, location.key]);

	if (loading) {
		return <Typography variant="h3">Cargando...</Typography>;
	}

	return (
		<Box>
			{params.id === undefined ? (
				<>
					<Box sx={{ minHeight: 350 }}>
						{/*<Box>
						<Button
							component={RouterLink}
							to={`/entrenamiento/${params.subject}`}
							variant="contained"
						>
							Entrenamiento
						</Button>
					</Box>*/}
						<Box>
							<Typography variant="h5">
								Parciales de{' '}
								{subjects
									.find((sub) => sub.value === params.subject)
									.label.toLowerCase()}
								.
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
																						{department}
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
					</Box>
					<Box>
						<Faq />
					</Box>
				</>
			) : (
				<>
					<Outlet />
				</>
			)}
		</Box>
	);
}
