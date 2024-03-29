export interface examsUiType {
	canSelect: boolean;
}

export interface contextUi {
	examsUi: examsUiType;
	setExamsUi: React.Dispatch<React.SetStateAction<examsUiType>>;
}
