import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
	selectInterface,
	subjects as subjectsArr,
} from 'app/shared/data/ubaxxi';

export const useSubject = () => {
	const [subject, setSubject] = useState<selectInterface | null>(null);
	const params = useParams();

	useEffect(() => {
		if (typeof params.subject === 'string') {
			const subj = subjectsArr.find((su) => su.value === params.subject);
			if (subj !== undefined) {
				setSubject(subj);
			} else {
				setSubject(null);
			}
		}
	}, [params.subject]);

	return [subject, setSubject];
};
