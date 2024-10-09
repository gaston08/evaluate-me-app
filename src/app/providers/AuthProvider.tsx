import { useState, ReactNode } from 'react';
import { AuthContext, defaultAuth } from 'app/contexts/Auth';
import { contextAuth } from 'app/shared/interfaces/auth';

interface AuthProviderProps {
	children: ReactNode;
}

export default function AuthProvider(props: AuthProviderProps) {
	const [auth, setAuth] = useState<contextAuth>(defaultAuth);

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
