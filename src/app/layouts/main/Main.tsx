// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './main.module.scss';
import { Outlet } from 'react-router-dom';

export default function Main() {
	return (
		<div className={styles.root}>
			<Outlet />
		</div>
	);
}
