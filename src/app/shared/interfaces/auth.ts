export interface userType {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
}

export interface authType {
	user: userType | null;
	isLoggedIn: boolean;
	isLoading: boolean;
}

export interface contextAuth {
	auth: authType;
	setAuth: React.Dispatch<React.SetStateAction<authType>>;
}
