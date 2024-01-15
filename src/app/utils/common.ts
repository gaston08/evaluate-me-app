const SEC = 1000;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

const TIME_VALUES = { SEC, MIN, HOUR, DAY };

export enum enumTime {
	SEC = 'SEC',
	MIN = 'MIN',
	HOUR = 'HOUR',
	DAY = 'DAY',
}

export const cleanStorage = (): void => {
	localStorage.removeItem('access_token');
	localStorage.removeItem('access_token_expires_in');
};

export const getExpireTime = (value: number, timeUnit: enumTime): number => {
	let expire_time: number = new Date().getTime();
	const addition_time: number = TIME_VALUES[timeUnit] * value;

	expire_time += addition_time;

	return expire_time;
};

export const isTokenExpired = (token_expires_time: string): boolean => {
	return token_expires_time - new Date().getTime() >= 0 ? false : true;
};

export const setToken = (token: string, expire_time: number): void => {
	localStorage.setItem('access_token', token);
	localStorage.setItem('access_token_expires_in', expire_time);
};
