import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { apiGetResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';
import NoExamFound from './NoExamFound';
import Exercises from '../components/Exercises';
import { ExamContext } from 'app/contexts/Exam';
import { createExam } from 'app/shared/interfaces/exam';

export default function Exam() {
	const params = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Array<string>>([]);
	const { exam, setExam } = useContext<createExam>(ExamContext);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const result: apiGetResponse = await axiosGet(
				`api/exam/find:${params.id}`,
			);
			if (result.ok) {
				setExam(result.data.exam);
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

		fetchData().then().catch(console.error);
	}, []);

	return (
		<>
			{loading ? (
				<Typography variant="h3">Cargando...</Typography>
			) : (
				<>
					{errors.length !== 0 ? (
						<NoExamFound errors={errors} />
					) : (
						<>
							<Box sx={{ mb: 5 }}>
								<Typography variant="h5" sx={{ mb: 2 }}>
									{exam.category}, {exam.year}
								</Typography>
								<Typography variant="h5">
									{exam.type}, TEMA {exam.exam_number}
								</Typography>
							</Box>
							<Exercises />
						</>
					)}
				</>
			)}
		</>
	);
}
