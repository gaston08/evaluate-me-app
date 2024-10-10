import { Fragment, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import InitialForm from './components/InitialForm';
import SolveExam from './components/SolveExam';
import ExamResult from './components/ExamResult';
import { useExam } from 'app/hooks/useExam';

import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

import { examResultType } from 'app/shared/interfaces/exam';
import { getCurrentSubject } from 'app/utils/subjects';

export default function View() {
	const {
		setExam,
		setCurrentSubject,
		setNumFullSelect,
		examState,
		setExamState,
	} = useContext<contextExam>(ExamContext);
	const params = useParams();
	const [loading, exam, examLabels] = useExam(params.id);

	useEffect(() => {
		if (params.subject !== undefined) {
			const subject = getCurrentSubject(params.subject);
			setCurrentSubject(subject);
		}
	}, [params.subject]);

	useEffect(() => {
		const exam_result = JSON.parse(
			localStorage.getItem(`${params.id}_result`),
		) as examResultType | null;

		if (exam !== null) {
			setExam(exam);
			if (exam_result === null) {
				let total = 0;

				exam.exercises.forEach((exercise) => {
					exercise.correctOptions.forEach((correctOpt) => {
						total += correctOpt.length;
					});
				});

				setNumFullSelect(total);

				localStorage.setItem(
					`${params.id}_result`,
					JSON.stringify({
						enabled: false,
						completed: false,
						selected_options: [],
						options_to_select: total,
					}),
				);
			} else {
				setNumFullSelect(exam_result.options_to_select);
			}
		}

		if (exam_result === null) {
			setExamState({
				showInitialForm: true,
				showSolveExam: false,
				showExamResult: false,
			});
		} else {
			if (exam_result.completed) {
				setExamState({
					showInitialForm: false,
					showSolveExam: false,
					showExamResult: true,
				});
			} else if (exam_result.enabled) {
				setExamState({
					showInitialForm: false,
					showSolveExam: true,
					showExamResult: false,
				});
			}
		}
	}, [params.id, exam]);

	if (loading) {
		return <h1>Cargando...</h1>;
	}

	return (
		<Fragment>
			<Fragment>
				{examState.showInitialForm && (
					<InitialForm labels={examLabels} id={exam._id} />
				)}
			</Fragment>
			<Fragment>
				{examState.showSolveExam && exam !== null && (
					<SolveExam labels={examLabels} />
				)}
			</Fragment>
			<Fragment>
				{examState.showExamResult && exam !== null && (
					<ExamResult labels={examLabels} />
				)}
			</Fragment>
		</Fragment>
	);
}
