import { useState, ReactNode } from 'react';
import { ExamContext, defaultCurrentExam } from 'app/contexts/Exam';
import { contextExam, examStateInterface } from 'app/shared/interfaces/exam';
import { selectInterface } from 'app/shared/data/ubaxxi';

interface ExamProviderProps {
	children: ReactNode;
}

export default function ExamProvider(props: ExamProviderProps) {
	const [selectedOptions, setSelectedOptions] = useState<Array<Array<string>>>(
		[],
	);
	const [subjects, setSubjects] = useState<Array<selectInterface>>([]);
	const [currentSubject, setCurrentSubject] = useState<selectInterface | null>(
		null,
	);
	const [exam, setExam] = useState<contextExam>(defaultCurrentExam);
	const [numFullSelect, setNumFullSelect] = useState<number>(0);
	const [examState, setExamState] = useState<examStateInterface>({
		showInitialForm: false,
		showSolveExam: false,
		showExamResult: false,
	});

	return (
		<ExamContext.Provider
			value={{
				exam,
				setExam,
				selectedOptions,
				setSelectedOptions,
				subjects,
				setSubjects,
				currentSubject,
				setCurrentSubject,
				numFullSelect,
				setNumFullSelect,
				examState,
				setExamState,
			}}
		>
			{props.children}
		</ExamContext.Provider>
	);
}
