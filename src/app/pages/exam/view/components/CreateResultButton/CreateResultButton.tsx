import { useState, useContext } from 'react';
import { decodeToken } from 'react-jwt';
import Button from '@mui/material/Button';
import {
	apiPostResponse,
	expressError,
} from 'app/shared/interfaces/api-response';
import { axiosPost } from 'app/utils/axios';
import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';

interface CreateResultButtonProps {
	examId: string;
	examYear: number;
	examType: string;
	examNumber: number;
	examSubject: string;
}

export default function CreateResultButton(props: CreateResultButtonProps) {
	const { examId, examYear, examType, examNumber, examSubject } = props;
	const { selectedOptions } = useContext<contextExam>(ExamContext);
	const [loading, setLoading] = useState<boolean>(false);

	const sendResult = async () => {
		const access_token = localStorage.getItem('access_token');
		const userId = decodeToken(access_token)._id as string;

		setLoading(true);
		const data = {
			userId,
			examId,
			answers: selectedOptions,
			score: 5,
			date: new Date().toString(),
			exam_year: examYear,
			exam_type: examType,
			exam_number: examNumber,
			exam_subject: examSubject,
		};
		const result: apiPostResponse = await axiosPost('api/result/create', data);
		if (result.ok) {
			// ok
			setLoading(false);
		} else {
			//setError(result.error);
			if (result.errors) {
				result.errors.forEach((err: expressError): void => {
					console.log(err.path, err.msg);
				});
			}

			setLoading(false);
		}
	};
	return (
		<>
			<Button
				disabled={loading}
				variant="contained"
				color="primary"
				onClick={() => sendResult}
			>
				Enviar exámen.
			</Button>
		</>
	);
}
