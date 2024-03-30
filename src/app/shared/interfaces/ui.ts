export interface examsUiType {
	canSelect: boolean;
}

export interface contextUi {
	examsUi: examsUiType;
	setExamsUi: React.Dispatch<React.SetStateAction<examsUiType>>;
}

export const enum ColorEnum {
	ERROR = 'error',
	SUCCESS = 'success',
	DEFAULT = 'default',
}
