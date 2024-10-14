import { Fragment, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
	const { currentSubject, setSelectedOptions, numFullSelect } =
		useContext<contextExam>(ExamContext);
	const params = useParams();

	const selectOption = useCallback((optionId: string, index: number) => {
		let newSelected = [];

		setSelectedOptions((prev) => {
			if (
				prev.findIndex(
					(selOpt) =>
						selOpt.optionId === optionId && selOpt.exerciseId === exercise.id,
				) === -1
			) {
				const num_selected = prev.filter(
					(selOpt) =>
						selOpt.exerciseId === exercise.id &&
						exercise.options[index].some((opt) => opt.id === selOpt.optionId),
				).length;

				if (num_selected === exercise.correctOptions[index].length) {
					// remove prev option
					const idx = prev.findIndex(
						(selOpt) =>
							selOpt.exerciseId === exercise.id &&
							exercise.options[index].some((opt) => opt.id === selOpt.optionId),
					);

					prev.splice(idx, 1);
					newSelected = [...prev];
					newSelected.push({ exerciseId: exercise.id, optionId: optionId });
				} else {
					// just add a new option
					newSelected = [
						...prev,
						{
							exerciseId: exercise.id,
							optionId: optionId,
						},
					];
				}
			} else {
				// remove option by toggle
				const idx = prev.findIndex(
					(selOpt) =>
						selOpt.optionId === optionId && selOpt.exerciseId === exercise.id,
				);

				prev.splice(idx, 1);
				newSelected = [...prev];
			}

			localStorage.setItem(
				`${params.id}_result`,
				JSON.stringify({
					enabled: true,
					complete: false,
					selected_options: newSelected,
					options_to_select: numFullSelect,
				}),
			);
			return newSelected;
		});
	}, []);

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
									<CodeOptionsPlay
										exercise={exercise}
										index={i}
										selectOption={selectOption}
									/>
								) : (
									<OptionsPlay
										exercise={exercise}
										index={i}
										selectOption={selectOption}
									/>
								)}
							</Fragment>
						</Box>
					);
				})}
			</Fragment>
		</Box>
	);
}
