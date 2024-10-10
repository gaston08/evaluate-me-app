import { Fragment, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import InitialForm from './components/InitialForm';
import SolveExamTemp from './components/SolveExamTemp';
import { useExam } from 'app/hooks/useExam';

import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

import { examResultType } from 'app/shared/interfaces/exam';
import { getCurrentSubject } from 'app/utils/subjects';

interface examState {
	showInitialForm: boolean;
	showSolveExam: boolean;
	showExamResult: boolean;
}

export default function View() {
	const { setExam, setCurrentSubject, setNumFullSelect } =
		useContext<contextExam>(ExamContext);
	const params = useParams();
	const [loading, exam, examLabels] = useExam(params.id);
	const [examState, setExamState] = useState<examState>({
		showInitialForm: false,
		showSolveExam: false,
		showExamResult: false,
	});

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
					<InitialForm
						setExamState={setExamState}
						labels={examLabels}
						id={exam._id}
					/>
				)}
			</Fragment>
			<Fragment>
				{examState.showSolveExam && exam !== null && (
					<SolveExamTemp exam={exam} labels={examLabels} />
				)}
			</Fragment>
		</Fragment>
	);
}
