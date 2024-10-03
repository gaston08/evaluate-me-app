import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ExerciseMin from './components/ExerciseMin';
import { Link as RouterLink } from 'react-router-dom';
import { axiosGet, axiosPost } from 'app/utils/axios';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import {
	exerciseType,
	examType as examInterface,
} from 'app/shared/interfaces/exam';
import {
	apiPostGetAllExams,
	apiGetAllTrainer,
} from 'app/shared/interfaces/api-response';
import { exam_types } from 'app/shared/data/exam';
import { subjects, selectInterface } from 'app/shared/data/ubaxxi';

async function getExams(
	array_id: Array<string>,
	setExercises: React.Dispatch<React.SetStateAction<Array<exerciseType>>>,
	setLoading: React.Dispatch<React.SetStateAction<Array<loading>>>,
) {
	const exercises = [];

	for (let i = 0, len = localStorage.length; i < len; ++i) {
		const idx = array_id.indexOf(localStorage.key(i));
		if (idx > -1) {
			const exam = JSON.parse(
				localStorage.getItem(localStorage.key(i)),
			) as examInterface;
			exercises.push(...exam.exercises);
			array_id.splice(idx, 1);
		}
	}

	if (array_id.length !== 0) {
		const result: apiPostGetAllExams = await axiosPost('api/exam/get-all', {
			ids: array_id,
		});
		if (result.ok) {
			result.data.exams.forEach((exam) => {
				localStorage.setItem(exam._id, JSON.stringify(exam));
				exercises.push(...exam.exercises);
			});
			setExercises(exercises);
		} else {
			console.log(result);
		}
	} else {
		setExercises(exercises);
	}

	setLoading(false);
}

interface TrainerStateInterface {
	currentIdx: number;
}

interface examInfoInterface {
	subject: string;
	examType: string;
	department: string;
}

export default function Trainer() {
	const params = useParams();
	const [exercises, setExercises] = useState<Array<exerciseType>>([]);
	const [currentIdx, setCurrentIdx] = useState<number>(() => {
		const prev = localStorage.getItem(
			`${params.department}-${params.type}-${params.subject}`,
		);

		if (prev !== null) {
			const current = JSON.parse(prev) as TrainerStateInterface;
			return current.currentIdx;
		} else {
			return 0;
		}
	});
	const [completed, setCompleted] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [examInfo] = useState<examInfoInterface>(() => {
		const subject: selectInterface = subjects.find(
			(sub) => sub.value === params.subject,
		);
		const examType: string = exam_types.find(
			(typ) => typ.value === params.type,
		).label;
		const department: string = subject.departments.find(
			(dep) => dep.value === params.department,
		).label;
		return {
			subject: subject.label,
			examType,
			department,
		};
	});

	useEffect(() => {
		async function fetchData() {
			const result: apiGetAllTrainer = await axiosGet(
				`api/exam/get/trainer/${params.subject}/${params.department}/${params.type}`,
			);

			console.log(result);
			if (result.ok) {
				const exams: Array<examInterface> = result.data.exams;
				const array_id = exams.map((exam) => exam._id);
				getExams(array_id, setExercises, setLoading).catch(console.error);
			} else {
				console.log('can not load exercises');
				setLoading(false);
			}
		}
		fetchData()
			.then()
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		const current: TrainerStateInterface = { currentIdx };
		localStorage.setItem(
			`${params.department}-${params.type}-${params.subject}`,
			JSON.stringify(current),
		);
	}, [currentIdx]);

	const handleNext = () => {
		setCompleted(false);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
		if (currentIdx === exercises.length - 1) {
			setCurrentIdx(0);
		} else {
			setCurrentIdx((prev) => prev + 1);
		}
	};

	if (loading) {
		return <Typography variant="body1">Cargando...</Typography>;
	}

	if (exercises.length === 0) {
		return (
			<Box>
				<Alert severity="warning">
					{/**No se encontraron exámenes {examInfo.examType} de {examInfo.subject},
					Cátedra {examInfo.department}
				**/}
					<Typography>
						Estamos subiendo ejercicios para este exámen, volvé a ingresar días
						antes del exámen.
					</Typography>
					<Typography sx={{ mb: 1 }}>
						Comunicate con <strong>ubaparciales@gmail.com</strong> para conocer
						el estado del exámen.
					</Typography>
				</Alert>
				<Button
					variant="contained"
					component={RouterLink}
					to={`/entrenamiento/${params.subject}`}
					sx={{ mt: 4, ml: 2 }}
				>
					Volver
				</Button>
			</Box>
		);
	}

	return (
		<Box sx={{ maxWidth: 800 }}>
			<Box sx={{ mt: -5, mb: 4 }}>
				<Typography>
					{examInfo.subject}, {examInfo.examType}, {examInfo.department}
				</Typography>
			</Box>
			<ExerciseMin
				completed={completed}
				setCompleted={setCompleted}
				exercise={exercises[currentIdx]}
				key={currentIdx}
			/>
			{completed ? (
				<Box sx={{ mt: 3, mb: 3, ml: 3 }}>
					<Button
						variant="contained"
						sx={{ minWidth: 100 }}
						onClick={handleNext}
					>
						NEXT
					</Button>
				</Box>
			) : null}
		</Box>
	);
}
