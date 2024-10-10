import { useState, useEffect, Fragment, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from '@mui/material/Link';
import {
	subjects as subjectsFull,
	selectInterface,
} from 'app/shared/data/ubaxxi';
import { SUBJECTS_ENUM } from 'app/shared/data/exam';
import { getSubjects } from 'app/utils/subjects';

import {
	apiGetAllSubjects,
	examsListInterface,
} from 'app/shared/interfaces/api-response';
import { examType as examTypeInterface } from 'app/shared/interfaces/exam';
import { axiosGet } from 'app/utils/axios';
import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';

const defaultExamsList = {
	primer_parcial: [],
	segundo_parcial: [],
	recuperatorio_primer_parcial: [],
	recuperatorio_segundo_parcial: [],
	final: [],
};

export default function ExamForm() {
	const [department, setDepartment] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [examsList, setExamsList] =
		useState<examsListInterface>(defaultExamsList);
	const navigate = useNavigate();
	const { subjects, setSubjects, currentSubject } =
		useContext<contextExam>(ExamContext);

	useEffect(() => {
		if (department !== '') {
			if (
				currentSubject.departments.findIndex(
					(departm) => departm.value === department,
				) !== -1
			) {
				if (
					currentSubject.value === SUBJECTS_ENUM.BIOLOGIA_54 ||
					currentSubject.value === SUBJECTS_ENUM.BIOLOGIA_91
				) {
					fetchData('both_biologias').catch(console.error);
				} else {
					fetchData().catch(console.error);
				}
			}
		}
	}, [currentSubject, department]);

	useEffect(() => {
		if (currentSubject !== null) {
			const subj = subjectsFull.find(
				(sub) => sub.value === currentSubject.value,
			);

			if (subj !== undefined) {
				const arr_departments = subj.departments;
				if (arr_departments.length === 1) {
					setDepartment(arr_departments[0].value);
				} else {
					setDepartment('');
				}
			}
		}
	}, [currentSubject]);

	useEffect(() => {
		if (currentSubject !== null) {
			if (
				subjects.length !== 0 &&
				subjects.findIndex((s) => s.value === currentSubject.value) === -1
			) {
				setSubjects((prev: Array<selectInterface>) => {
					return [
						subjectsFull.find((s) => s.value === currentSubject.value),
						...prev,
					] as Array<selectInterface>;
				});
			}
		}
	}, [subjects]);

	useEffect(() => {
		const subjects_arr = getSubjects();
		setSubjects(subjects_arr);
	}, []);

	const fetchData = async (subjectName) => {
		if (subjectName === undefined) {
			setErrors([]);
			setLoading(true);
			const result: apiGetAllSubjects = await axiosGet(
				`api/exam/get/${currentSubject.value}/${department}`,
			);
			if (result.ok) {
				setExamsList(result.data.examsList);
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
		} else {
			if (subjectName === 'both_biologias') {
				setErrors([]);
				setLoading(true);

				const bio_54: apiGetAllSubjects = await axiosGet(
					`api/exam/get/${SUBJECTS_ENUM.BIOLOGIA_54}/${department}`,
				);

				const bio_91: apiGetAllSubjects = await axiosGet(
					`api/exam/get/${SUBJECTS_ENUM.BIOLOGIA_91}/${department}`,
				);

				if (bio_54.ok || bio_91.ok) {
					const obj = {
						primer_parcial: [],
						segundo_parcial: [],
						recuperatorio_primer_parcial: [],
						recuperatorio_segundo_parcial: [],
						final: [],
					};

					if (bio_91.ok) {
						obj.primer_parcial.push(...bio_91.data.examsList.primer_parcial);
						obj.segundo_parcial.push(...bio_91.data.examsList.segundo_parcial);
						obj.recuperatorio_primer_parcial.push(
							...bio_91.data.examsList.recuperatorio_primer_parcial,
						);
						obj.recuperatorio_segundo_parcial.push(
							...bio_91.data.examsList.recuperatorio_segundo_parcial,
						);
						obj.final.push(...bio_91.data.examsList.final);
					}

					if (bio_54.ok) {
						obj.primer_parcial.push(...bio_54.data.examsList.primer_parcial);
						obj.segundo_parcial.push(...bio_54.data.examsList.segundo_parcial);
						obj.recuperatorio_primer_parcial.push(
							...bio_54.data.examsList.recuperatorio_primer_parcial,
						);
						obj.recuperatorio_segundo_parcial.push(
							...bio_54.data.examsList.recuperatorio_segundo_parcial,
						);
						obj.final.push(...bio_54.data.examsList.final);
					}

					setExamsList(obj);
					setLoading(false);
				} else {
					if (bio_54.errors) {
						const errorsArr: Array<string> = bio_54.errors.map((err) => {
							return err.msg;
						});

						setErrors(errorsArr);
					} else if (bio_54.error) {
						setErrors([bio_54.error]);
					}
					setLoading(false);
				}
			}
		}
	};

	if (currentSubject === null) {
		return null;
	}

	return (
		<>
			<Grid container gap={3}>
				<Grid item xs={10} sm={8} md={6} lg={3}>
					<FormControl fullWidth>
						<InputLabel id="select-subject">Materia:</InputLabel>
						<Select
							labelId="select-subject"
							value={currentSubject.value}
							label="Materia"
							onChange={(e: SelectChangeEvent) => {
								setExamsList(defaultExamsList);
								navigate(`/entrenamiento/${e.target.value}`);
							}}
						>
							{subjects.map((subj) => {
								return (
									<MenuItem key={subj.value} value={subj.value}>
										{subj.label}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={10} sm={8} md={6} lg={3}>
					<FormControl fullWidth>
						<InputLabel id="select-department">Cátedra:</InputLabel>
						<Select
							labelId="select-department"
							value={department}
							label="Cátedra"
							onChange={(e: SelectChangeEvent) => {
								setExamsList(defaultExamsList);
								setDepartment(e.target.value);
							}}
						>
							{subjectsFull
								.find((sub) => sub.value === currentSubject.value)
								.departments.map((dept) => {
									return (
										<MenuItem key={dept.value} value={dept.value}>
											{dept.label}
										</MenuItem>
									);
								})}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Box sx={{ mt: 5 }}>
				{errors.length === 0 && !loading ? (
					<Box>
						<Fragment>
							{examsList.primer_parcial.length !== 0 && (
								<ExamsList
									exams={examsList.primer_parcial}
									title="Primer parcial"
								/>
							)}
						</Fragment>
						<Fragment>
							{examsList.segundo_parcial.length !== 0 && (
								<ExamsList
									exams={examsList.segundo_parcial}
									title="Segundo parcial"
								/>
							)}
						</Fragment>
						<Fragment>
							{examsList.recuperatorio_primer_parcial.length !== 0 && (
								<ExamsList
									exams={examsList.recuperatorio_primer_parcial}
									title="Recuperatorio primer parcial"
								/>
							)}
						</Fragment>
						<Fragment>
							{examsList.recuperatorio_segundo_parcial.length !== 0 && (
								<ExamsList
									exams={examsList.recuperatorio_segundo_parcial}
									title="Recuperatorio segundo parcial"
								/>
							)}
						</Fragment>
						<Fragment>
							{examsList.final.length !== 0 && (
								<ExamsList exams={examsList.final} title="Final" />
							)}
						</Fragment>
					</Box>
				) : (
					<Fragment>
						{loading ? (
							<Box>Cargando...</Box>
						) : (
							<Box>
								{errors.map((err: string, i: number) => {
									return (
										<Typography sx={{ color: 'red' }} key={i} variant="body1">
											{err}
										</Typography>
									);
								})}
							</Box>
						)}
					</Fragment>
				)}
			</Box>
		</>
	);
}

interface ExamsListProps {
	title: string;
	exams: Array<examTypeInterface>;
}

function ExamsList(props: ExamsListProps) {
	const { exams, title } = props;
	return (
		<Box>
			<Typography variant="body1">{title}</Typography>
			<Grid container gap={1} sx={{ pl: 2, mt: 1, mb: 3 }}>
				{exams.map((exam) => {
					return (
						<Grid item key={exam._id}>
							<Link
								component={RouterLink}
								to={`/tests/${exam.subject}/${exam._id}`}
								sx={{ mr: 4 }}
							>
								TEMA {exam.exam_number}
							</Link>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
