import { useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { contextExam } from 'app/shared/interfaces/exam';
import { ExamContext } from 'app/contexts/Exam';

import { UiContext } from 'app/contexts/Ui';
import { contextUi } from 'app/shared/interfaces/ui';

export default function RetakeExamButton() {
	const { setExamState } = useContext<contextExam>(ExamContext);
	const { setExamsUi } = useContext<contextUi>(UiContext);

	const params = useParams();

	const retakeExam = useCallback(() => {
		localStorage.removeItem(`${params.id}_result`);

		setExamState({
			showInitialForm: true,
			showSolveExam: false,
			showExamResult: false,
		});

		setExamsUi((prev) => {
			return {
				...prev,
				isTrainer: false,
				isTest: false,
			};
		});
	}, [params.id]);

	return (
		<Button
			onClick={retakeExam}
			className="remake-exam-button"
			variant="outlined"
		>
			Rehacer examen
		</Button>
	);
}
