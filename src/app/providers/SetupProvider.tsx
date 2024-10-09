import { Fragment, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { mongo_id_regex } from 'app/utils/common';

function cleanExams() {
	for (let i = 0, len = localStorage.length; i < len; ++i) {
		const key = localStorage.key(i);
		if (mongo_id_regex.test(key)) {
			localStorage.removeItem(key);
		}
	}
	localStorage.setItem('last-clean-exams', new Date());
}

interface SetupProviderProps {
	children: ReactNode;
}

export default function SetupProvider(props: SetupProviderProps) {
	const access_token: string = localStorage.getItem('access_token');

	if (access_token !== '') {
		axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
	}

	useEffect(() => {
		const last_clean_exams = localStorage.getItem('last-clean-exams');

		if (last_clean_exams === null) {
			cleanExams();
		} else {
			const last_clean = new Date(last_clean_exams);
			const now = new Date();

			// check for a week
			if (now - last_clean >= 604800000) {
				cleanExams();
			}
		}
	}, []);

	return <Fragment>{props.children}</Fragment>;
}
