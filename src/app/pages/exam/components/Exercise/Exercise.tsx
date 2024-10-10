import { Fragment, useContext } from 'react';
import Box from '@mui/material/Box';
import ScreenshotButton from 'app/components/ScreenshotButton';
import ScreenshotButtonPC from 'app/components/ScreenshotButtonPC';
import CodeOptions from './components/CodeOptions';
import Options from './components/Options';
import PythonQuestion from './components/PythonQuestion';
import Question from './components/Question';
import { exerciseType } from 'app/shared/interfaces/exam';
import { SUBJECTS_ENUM } from 'app/shared/data/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

interface ExerciseProps {
	exercise: exerciseType;
	warningAlert: boolean;
}

export default function Exercise(props: ExerciseProps) {
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
									<CodeOptions exercise={exercise} i={i} />
								) : (
									<Options exercise={exercise} i={i} />
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

/*function ExclamationIcon() {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="circle-exclamation"
			className="svg-inline--fa fa-circle-exclamation "
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			style={{ width: 20, height: 20 }}
		>
			<path
				fill="currentColor"
				d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
			></path>
		</svg>
	);
}
*/
