import { Fragment, useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import ScreenshotButton from 'app/components/ScreenshotButton';
import ScreenshotButtonPC from 'app/components/ScreenshotButtonPC';

import CodeOptionsResult from 'app/pages/exam/components/CodeOptionsResult';
import OptionsResult from 'app/pages/exam/components/OptionsResult';
import PythonQuestion from 'app/pages/exam/components/PythonQuestion';
import Question from 'app/pages/exam/components/Question';

import { exerciseType } from 'app/shared/interfaces/exam';
import { SUBJECTS_ENUM } from 'app/shared/data/exam';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

interface ExerciseResultProps {
	exercise: exerciseType;
}

export default function ExerciseResult(props: ExerciseResultProps) {
	const { exercise } = props;
	const { currentSubject, selectedOptions } =
		useContext<contextExam>(ExamContext);
	const [optionsCorrect, setOptionsCorrect] = useState<boolean>(false);

	useEffect(() => {
		let show_argument: boolean = true;

		exercise.correctOptions.forEach((correctOptArr) => {
			const is_correct = correctOptArr.every((optId) => {
				return (
					selectedOptions.find(
						(selOpt) =>
							selOpt.optionId === optId && selOpt.exerciseId === exercise.id,
					) !== undefined
				);
			});

			if (!is_correct) {
				show_argument = false;
			}
		});

		setOptionsCorrect(show_argument);
	}, [selectedOptions]);

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
									<CodeOptionsResult exercise={exercise} i={i} />
								) : (
									<OptionsResult exercise={exercise} i={i} />
								)}
							</Fragment>
						</Box>
					);
				})}
			</Fragment>
			<Fragment>
				<Box sx={{ pl: 2, mt: 2 }} id="exercise-feedback-view">
					<Fragment>
						{optionsCorrect ? (
							<Alert severity="success" className="alert-mui">
								<AlertTitle>Correcto!</AlertTitle>
								<div
									dangerouslySetInnerHTML={{
										__html: exercise.argument[0].text,
									}}
								></div>
							</Alert>
						) : (
							<Alert severity="error" className="alert-mui">
								<AlertTitle>Incorrecto.</AlertTitle>
								<div
									dangerouslySetInnerHTML={{
										__html: exercise.argument[0].text,
									}}
								></div>
							</Alert>
						)}
					</Fragment>
				</Box>
			</Fragment>
		</Box>
	);
}
