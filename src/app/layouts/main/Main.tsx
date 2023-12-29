import { Outlet } from 'react-router-dom';

export default function Main() {
	return (
		<div className={styles.root}>
			<Outlet />
		</div>
	);
}
