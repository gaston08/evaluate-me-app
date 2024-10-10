import { useState, useEffect, useContext } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { exam_types, SUBJECTS_ENUM } from 'app/shared/data/exam';
import {
	subjects as subjectsFull,
	selectInterface,
} from 'app/shared/data/ubaxxi';
import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';
import { getSubjects } from 'app/utils/subjects';

export default function TrainerForm() {
	const params = useParams();
	const [subject, setSubject] = useState<SUBJECTS_ENUM>(params.subject);
	const [examType, setExamType] = useState<string>('');
	const [department, setDepartment] = useState<string>('');
	const { subjects, setSubjects } = useContext<contextExam>(ExamContext);
	const navigate = useNavigate();

	useEffect(() => {
		const arr = subjectsFull.find((sub) => sub.value === subject).departments;
		if (arr.length === 1) {
			setDepartment(arr[0].value);
		} else {
			setDepartment('');
		}
	}, [subject]);

	useEffect(() => {
		if (
			subjects.length !== 0 &&
			subjects.findIndex((s) => s.value === subject) === -1
		) {
			setSubjects((prev: Array<selectInterface>) => {
				return [
					subjectsFull.find((s) => s.value === subject),
					...prev,
				] as Array<selectInterface>;
			});
		}
	}, [subjects]);

	useEffect(() => {
		const subjects_arr = getSubjects();
		setSubjects(subjects_arr);
	}, []);

	const enableButton = () => {
		if (examType === '' || department === '') {
			return false;
		}
		return true;
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
								setSubject(e.target.value);
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
						<InputLabel id="select-exam-type">Tipo de Exámen:</InputLabel>
						<Select
							labelId="select-exam-type"
							value={examType}
							label="Tipo de Exámen"
							onChange={(e: SelectChangeEvent) => {
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
								setDepartment(e.target.value);
							}}
						>
							{subjectsFull
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
					component={RouterLink}
					to={`/entrenamiento/${subject}/${examType}/${department}`}
					variant="contained"
				>
					Iniciar entrenamiento
				</Button>
			</Box>
		</>
	);
}
