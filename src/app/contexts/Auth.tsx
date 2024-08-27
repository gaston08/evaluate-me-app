import { createContext } from 'react';
import { contextAuth } from 'app/shared/interfaces/auth';

export const AuthContext = createContext<contextAuth>({
	auth: {},
	setAuth: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const defaultAuth = {
	user: null,
	isLoggedIn: false,
	isLoading: true,
	coffees: 0,
};
