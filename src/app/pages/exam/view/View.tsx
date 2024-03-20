import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetResponse } from 'app/shared/interfaces/api-response';
import { axiosGet } from 'app/utils/axios';

export default function Exam() {
	const params = useParams();

	useEffect(() => {
		async function fetchData() {
			const result: apiGetResponse = await axiosGet(
				`api/exam/find:${params.id}`,
			);
			console.log(result);
			if (result.ok) {
			} else {
				/*setError(result.error);
					setOpen(true);
					if (result.errors) {
						result.errors.forEach((err: expressError): void => {
							setError(err.msg);
							setOpen(true);
						});
					}
					setLoading(false);*/
			}
		}

		try {
			fetchData().then().catch(console.error);
		} catch (err) {
			console.log(err);
		}
	}, []);

	return <>Hola</>;
}
