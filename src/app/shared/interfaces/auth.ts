export interface userType {
	_id: string;
	email: string;
	fullName: string;
	username: string;
	role: string;
	avatarUrl: string | undefined;
	coffees: number;
	invitations: number;
	invitation_code: number;
	received_invitations: Array<string>;
}

export interface authType {
	user: userType | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	coffees: number;
}

export interface contextAuth {
	auth: authType;
	setAuth: React.Dispatch<React.SetStateAction<authType>>;
}
