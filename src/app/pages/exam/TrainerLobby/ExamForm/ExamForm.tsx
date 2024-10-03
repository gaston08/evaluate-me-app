import { useState, useEffect, Fragment } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from '@mui/material/Link';

import { subjects } from 'app/shared/data/ubaxxi';
import {
	apiGetAllSubjects,
	examsListInterface,
} from 'app/shared/interfaces/api-response';
import { examType as examTypeInterface } from 'app/shared/interfaces/exam';
import { axiosGet } from 'app/utils/axios';

const defaultExamsList = {
	primer_parcial: [],
	segundo_parcial: [],
	recuperatorio_primer_parcial: [],
	recuperatorio_segundo_parcial: [],
	final: [],
};

export default function ExamForm() {
	const params = useParams();
	const [subject, setSubject] = useState<string>(params.subject);
	const [department, setDepartment] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [examsList, setExamsList] =
		useState<examsListInterface>(defaultExamsList);

	useEffect(() => {
		if (subject !== '' && department !== '') {
			fetchData().catch(console.error);
		}
	}, [subject, department]);

	useEffect(() => {
		const arr = subjects.find((sub) => sub.value === subject).departments;
		if (arr.length === 1) {
			setDepartment(arr[0].value);
		} else {
			setDepartment('');
		}
	}, [subject]);

	const fetchData = async () => {
		setErrors([]);
		setLoading(true);
		const result: apiGetAllSubjects = await axiosGet(
			`api/exam/get/${subject}/${department}`,
		);
		if (result.ok) {
			if (result.data.examsList.length === 0) {
				setErrors([
					'No se encontraron exámenes. Mandanos un correo contandonos que parciales estás buscando: ubaparciales@gmail.com',
				]);
				setLoading(false);
			} else {
				setExamsList(result.data.examsList);
				setLoading(false);
			}
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
	};

	return (
		<>
			<Grid container gap={3}>
				<Grid item xs={10} sm={8} md={6} lg={3}>
					<FormControl fullWidth>
						<InputLabel id="select-subject">Materia:</InputLabel>
						<Select
							labelId="select-subject"
							value={subject}
							label="Materia"
							onChange={(e: SelectChangeEvent) => {
								setExamsList(defaultExamsList);
								setSubject(e.target.value);
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
							{subjects
								.find((sub) => sub.value === subject)
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
