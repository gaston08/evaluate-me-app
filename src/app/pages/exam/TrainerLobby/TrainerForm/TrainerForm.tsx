import { useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { exam_types } from 'app/shared/data/exam';

import { subjects } from 'app/shared/data/ubaxxi';

export default function TrainerForm() {
	const params = useParams();
	const [subject, setSubject] = useState<string>(params.subject);
	const [examType, setExamType] = useState<string>('');
	const [department, setDepartment] = useState<string>('');

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
