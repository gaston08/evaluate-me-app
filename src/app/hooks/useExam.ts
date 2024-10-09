import { useState, useEffect } from 'react';
import { examType as examInterface } from 'app/shared/interfaces/exam';
import { subjects, selectInterface } from 'app/shared/data/ubaxxi';
import { exam_types } from 'app/shared/data/exam';
import { apiGetResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';

interface examLabelsInterface {
	subject: string;
	examType: string;
	department: string;
	examNumber: number;
	year: number;
}

const getExamLabels = (exam: examInterface): examLabelsInterface => {
	const subject: selectInterface = subjects.find(
		(sub) => sub.value === exam.subject,
	);
	const examType: string = exam_types.find(
		(typ) => typ.value === exam.type,
	).label;

	const department: string = subject.departments.find(
		(dep) => dep.value === exam.department,
	).label;

	return {
		subject: subject.label,
		examType,
		department,
		examNumber: exam.exam_number,
		year: exam.year,
	};
};

export const useExam = (
	id: string,
): [boolean, examInterface | null, examLabelsInterface, boolean] => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const [exam, setExam] = useState<examInterface | null>(null);
	const [examLabels, setExamLabels] = useState<examLabelsInterface>({
		subject: '',
		examType: '',
		department: '',
		examNumber: 0,
		year: 0,
	});

	useEffect(() => {
		const exam_local_storage = JSON.parse(
			localStorage.getItem(id),
		) as examInterface | null;

		if (exam_local_storage === null) {
			fetchData().catch(console.error);
		} else {
			setExam(exam_local_storage);
			setExamLabels(getExamLabels(exam_local_storage));
			setLoading(false);
		}
	}, [id]);

	const fetchData = async () => {
		setLoading(true);

		const result: apiGetResponse = await axiosGet(`api/exam/find:${id}`);

		if (result.ok) {
			const exam_api: examInterface = result.data.exam;
			setExam(exam_api);
			setExamLabels(getExamLabels(exam_api));
			localStorage.setItem(id, JSON.stringify(exam_api));
			setLoading(false);
		} else {
			setError(true);
			setLoading(false);
		}
	};

	return [loading, exam, examLabels, error];
};
