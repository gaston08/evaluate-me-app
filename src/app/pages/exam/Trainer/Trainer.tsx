import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ExerciseMin from './components/ExerciseMin';
import { axiosGet, axiosPost } from 'app/utils/axios';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { exerciseType } from 'app/shared/interfaces/exam';
import {
	apiPostGetAllExams,
	apiGetAllSubjects,
} from 'app/shared/interfaces/api-response';

interface exam {
	[key: string]: {
		[key: string]: {
			[key: string]: {
				[key: string]: string;
			};
		};
	};
}

async function getExams(
	array_id: Array<string>,
	setExercises: React.Dispatch<React.SetStateAction<Array<exerciseType>>>,
) {
	const result: apiPostGetAllExams = await axiosPost('api/exam/get-all', {
		ids: array_id,
	});
	if (result.ok) {
		const exercises = [];
		result.data.exams.forEach((exam) => {
			exercises.push(...exam.exercises);
		});
		setExercises(exercises);
	} else {
		console.log(result);
	}
}

interface TrainerStateInterface {
	currentIdx: number;
}

export default function Trainer() {
	const params = useParams();
	const [exercises, setExercises] = useState<Array<exerciseType>>([]);
	const [currentIdx, setCurrentIdx] = useState<number>(() => {
		const prev = localStorage.getItem(
			params.department + params.type + params.subject,
		);

		if (prev !== null) {
			const current = JSON.parse(prev) as TrainerStateInterface;
			return current.currentIdx;
		} else {
			return 0;
		}
	});
	const [completed, setCompleted] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			const result: apiGetAllSubjects = await axiosGet(
				`api/exam/get:${params.subject}`,
			);
			if (result.ok) {
				const exams: exam = result.data.exams;
				const years = Object.keys(result.data.exams) as Array<number>;
				const last_year: number = years[years.length - 1];
				if (result.data.exams[last_year]) {
					const exams_year: exam = exams[last_year];
					if (exams_year[params.type]) {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						const exams_type = exams_year[params.type];

						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						if (exams_type[params.department]) {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
							const array_id = Object.values(exams_type[params.department]);
							getExams(array_id, setExercises).catch(console.error);
						} else {
							console.log('no exams from department ' + params.department);
						}
					} else {
						console.log('no exams with type ' + params.type);
					}
				}
			} else {
				console.log('can not load exercises');
			}
		}
		fetchData().then().catch(console.error);
	}, []);

	useEffect(() => {
		const current: TrainerStateInterface = { currentIdx };
		localStorage.setItem(
			params.department + params.type + params.subject,
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

	if (exercises.length === 0) {
		return 'No exercises';
	}

	return (
		<Fragment>
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
		</Fragment>
	);
}
