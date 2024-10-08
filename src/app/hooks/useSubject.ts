import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
	selectInterface,
	subjects as subjectsArr,
} from 'app/shared/data/ubaxxi';

export const useSubject = (): Array<selectInterface> => {
	const params = useParams();
	const [subject, setSubject] = useState<selectInterface | object>(() => {
		const subj = subjectsArr.find((su) => su.value === params.subject);
		return subj === undefined ? {} : subj;
	});

	useEffect(() => {
		if (typeof params.subject === 'string') {
			const subj = subjectsArr.find((su) => su.value === params.subject);
			if (subj !== undefined) {
				setSubject(subj);
			} else {
				setSubject({});
			}
		}
	}, [params.subject]);

	return [subject, setSubject];
};
