import { useState, ReactNode } from 'react';
import { ExamContext, defaultCurrentExam } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

interface ExamProviderProps {
	children: ReactNode;
}

export default function ExamProvider(props: ExamProviderProps) {
	const [selectedOptions, setSelectedOptions] = useState<Array<Array<string>>>(
		[],
	);

	const [exam, setExam] = useState<contextExam>(defaultCurrentExam);

	return (
		<ExamContext.Provider
			value={{
				exam,
				setExam,
				selectedOptions,
				setSelectedOptions,
			}}
		>
			{props.children}
		</ExamContext.Provider>
	);
}
