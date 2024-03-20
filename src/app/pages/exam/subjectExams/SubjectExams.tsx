import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import { apiGetAllSubjects } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';

interface exam {
	[key: string]: {
		[key: string]: {
			[key: string]: string;
		};
	};
}

export default function SubjectExams() {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [exams, setExams] = useState<exam>({});

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
	}, []);

	if (loading) {
		return <Typography variant="h3">Cargando...</Typography>;
	}

	return (
		<div>
			{params.id === undefined ? (
				<div>
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
											<Box sx={{ ml: 2 }}>
												{Object.keys(exams[year]).map((type) => {
													return (
														<Box key={type}>
															<p>{type}</p>
															<Box sx={{ ml: 2 }}>
																{Object.keys(exams[year][type]).map(
																	(examNumber) => {
																		return (
																			<Link
																				component={RouterLink}
																				to={exams[year][type][examNumber]}
																				key={examNumber}
																				sx={{ mr: 2 }}
																			>
																				TEMA {examNumber}{' '}
																			</Link>
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
				</div>
			) : (
				<Outlet />
			)}
		</div>
	);
}
