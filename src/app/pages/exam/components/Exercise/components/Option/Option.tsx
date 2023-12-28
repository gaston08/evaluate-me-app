// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './option.module.scss';
import { useContext } from 'react';
import { ExercisesContext } from '../../../../../../contexts/Exercises';

interface OptionProps {
	id: number;
	title: string;
}

export default function Option(props: OptionProps) {
	const { title, id, exerciseId } = props;
	const { setSelected } = useContext(ExercisesContext);

	const selectOption = (id) => {
		setSelected((prev) => {
			const arr = [...prev];

			const index = arr.findIndex((opt) => opt.exerciseId === exerciseId);
			if (index !== -1) {
				arr[index] = {
					optionId: id,
					exerciseId,
				};
			} else {
				arr.push({
					optionId: id,
					exerciseId,
				});
			}
			return arr;
		});
	};

	return (
		<button className={styles.button} onClick={() => selectOption(id)}>
			{title}
		</button>
	);
}
