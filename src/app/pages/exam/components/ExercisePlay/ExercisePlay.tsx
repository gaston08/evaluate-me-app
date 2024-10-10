import { Fragment, useContext } from 'react';
import Box from '@mui/material/Box';
import ScreenshotButton from 'app/components/ScreenshotButton';
import ScreenshotButtonPC from 'app/components/ScreenshotButtonPC';

import CodeOptionsPlay from 'app/pages/exam/components/CodeOptionsPlay';
import OptionsPlay from 'app/pages/exam/components/OptionsPlay';
import PythonQuestion from 'app/pages/exam/components/PythonQuestion';
import Question from 'app/pages/exam/components/Question';

import { exerciseType } from 'app/shared/interfaces/exam';
import { SUBJECTS_ENUM } from 'app/shared/data/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

interface ExercisePlayProps {
	exercise: exerciseType;
	warningAlert: boolean;
}

export default function ExercisePlay(props: ExercisePlayProps) {
	const { exercise } = props;
	const { currentSubject } = useContext<contextExam>(ExamContext);

	return (
		<Box className="exercise-exam">
			<Fragment>
				{currentSubject.value === SUBJECTS_ENUM.PENSAMIENTO_COMPUTACIONAL ? (
					<ScreenshotButtonPC exercise={exercise} />
				) : (
					<ScreenshotButton exercise={exercise} />
				)}
			</Fragment>
			<Fragment>
				{Array.from(Array(exercise.question.length), (e, i: number) => {
					return (
						<Box key={i}>
							{exercise.question[i].code ? (
								<PythonQuestion question={exercise.question[i]} />
							) : (
								<Question
									question={exercise.question[i]}
									correctOptionsLength={exercise.correctOptions[i].length}
								/>
							)}

							<Fragment>
								{exercise.question[i].code ? (
									<CodeOptionsPlay exercise={exercise} i={i} />
								) : (
									<OptionsPlay exercise={exercise} i={i} />
								)}
							</Fragment>
						</Box>
					);
				})}
			</Fragment>
			<Fragment>
				<Box sx={{ pl: 2, mt: 2 }} id="exercise-feedback-view">
					<Fragment>
						{/*'a' !== '' && (
							<Alert severity="success" className="alert-mui">
								<AlertTitle>Correcto!</AlertTitle>
								<div
									dangerouslySetInnerHTML={{
										__html: 'ok',
									}}
								></div>
							</Alert>
						)*/}
					</Fragment>
					<Fragment>
						{/*'a' !== '' && (
							<Alert
								severity={warningAlert ? 'warning' : 'error'}
								className="alert-mui"
							>
								<AlertTitle>Incorrecto.</AlertTitle>
								<div
									dangerouslySetInnerHTML={{
										__html: 'ok',
									}}
								></div>
							</Alert>
						)*/}
					</Fragment>
				</Box>
			</Fragment>
		</Box>
	);
}
