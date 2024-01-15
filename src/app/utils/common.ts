export const cleanStorage = (): void => {
	localStorage.removeItem('access_token');
	localStorage.removeItem('access_token_expires_in');
};
