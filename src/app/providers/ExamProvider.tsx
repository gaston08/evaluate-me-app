import { useState, ReactNode } from 'react';
import { ExamContext, defaultCurrentExam } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';
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
			}}
		>
			{props.children}
		</ExamContext.Provider>
	);
}
