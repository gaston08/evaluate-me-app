import { useState, ReactNode } from 'react';
import { UiContext, defaultExamsUi } from 'app/contexts/Ui';
import { contextUi } from 'app/shared/interfaces/ui';

interface UiProviderProps {
	children: ReactNode;
}

export default function UiProvider(props: UiProviderProps) {
	const [examsUi, setExamsUi] = useState<contextUi>(defaultExamsUi);

	return (
		<UiContext.Provider value={{ examsUi, setExamsUi }}>
			{props.children}
		</UiContext.Provider>
	);
}
