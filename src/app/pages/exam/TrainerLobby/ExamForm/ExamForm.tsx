import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { exam_types } from 'app/shared/exams/exam';
import Link from '@mui/material/Link';

import { subjects } from 'app/shared/exams/ubaxxi';
import { apiGetAllSubjects } from 'app/shared/interfaces/api-response';
import { examType as examTypeInterface } from 'app/shared/interfaces/exam';
import { axiosGet } from 'app/utils/axios';

export default function ExamForm() {
	const params = useParams();
	const [subject, setSubject] = useState<string>(params.subject);
	const [examType, setExamType] = useState<string>('');
	const [department, setDepartment] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const [exams, setExams] = useState<Array<examTypeInterface>>([]);

	const fetchData = async () => {
		setErrors([]);
		setLoading(true);
		const result: apiGetAllSubjects = await axiosGet(
			`api/exam/get/${subject}/${department}/${examType}`,
		);
		if (result.ok) {
			if (result.data.exams.length === 0) {
				setErrors([
					'No se encontraron exámenes. Mandanos un correo contandonos que parciales estás buscando: ubaparciales@gmail.com',
				]);
				setLoading(false);
			} else {
				const examsArr = result.data.exams.sort((a, b) => {
					return a.exam_number - b.exam_number;
				});
				setExams(examsArr);
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

	const enableButton = () => {
		if (examType === '' || department === '' || loading) {
			return false;
		}
		return true;
	};

	const handleClick = () => {
		fetchData().catch(console.error);
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
								setExams([]);
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
						<InputLabel id="select-exam-type">Tipo de Exámen:</InputLabel>
						<Select
							labelId="select-exam-type"
							value={examType}
							label="Tipo de Exámen"
							onChange={(e: SelectChangeEvent) => {
								setExams([]);
								setExamType(e.target.value);
							}}
						>
							{exam_types.map((typ) => {
								return (
									<MenuItem key={typ.value} value={typ.value}>
										{typ.label}
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
								setExams([]);
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
			<Box sx={{ mt: 2 }}>
				<Button
					disabled={!enableButton()}
					variant="contained"
					onClick={handleClick}
				>
					BUSCAR
				</Button>
			</Box>
			<Box sx={{ mt: 5 }}>
				{errors.length === 0 ? (
					<Grid gap={1} container sx={{ ml: 2 }}>
						{exams.map((exam) => {
							return (
								<Box key={exam._id}>
									<Link
										component={RouterLink}
										to={`/tests/${subject}/${exam._id}`}
										sx={{ mr: 4 }}
									>
										TEMA {exam.exam_number}
									</Link>
								</Box>
							);
						})}
					</Grid>
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
			</Box>
		</>
	);
}
