import { createContext } from 'react';
import { contextUi } from 'app/shared/interfaces/ui';

export const UiContext = createContext<contextUi>({
	examsUi: {},
	setExamsUi: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const defaultExamsUi = {
	canSelect: false,
};
