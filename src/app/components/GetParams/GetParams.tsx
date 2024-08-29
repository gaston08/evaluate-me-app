import { useSearchParams, Navigate } from 'react-router-dom';

export default function GetParams() {
	const [searchParams] = useSearchParams();

	if (searchParams.get('code') !== null) {
		localStorage.setItem('invitation_code', searchParams.get('code'));
	}

	return <Navigate to="/tests" replace />;
}
