import { exerciseType, exerciseFeedback } from 'app/shared/interfaces/exam';
import { examsUiType } from 'app/shared/interfaces/ui';

export const setUpExam = (
	exercises: Array<exerciseType>,
	setSelectedOptions: React.Dispatch<
		React.SetStateAction<Array<Array<Array<string>>>>
	>,
	setExercisesFeedback: React.Dispatch<
		React.SetStateAction<Array<exerciseFeedback>>
	>,
	setExamsUi: React.Dispatch<React.SetStateAction<examsUiType>>,
) => {
	const exArr = Array.from({ length: exercises.length }, () => []);

	for (let i = 0; i < exArr.length; i++) {
		exArr[i] = Array.from(
			{
				length: exercises[i].options.length,
			},
			() => [],
		);
	}

	setSelectedOptions(
		JSON.parse(JSON.stringify(exArr)) as Array<Array<Array<string>>>,
	);

	const exercisesFeedbackArr = Array.from({ length: exercises.length }, () => {
		return {
			success: '',
			error: '',
			html: false,
		};
	});

	setExercisesFeedback(exercisesFeedbackArr);

	setExamsUi((prev) => {
		return {
			...prev,
			isPlayView: true,
		};
	});
};
