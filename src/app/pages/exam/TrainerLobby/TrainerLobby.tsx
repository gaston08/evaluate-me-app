import {
	useEffect,
	ReactNode,
	useContext,
	useState,
	SyntheticEvent,
} from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TrainerForm from './TrainerForm';
import ExamForm from './ExamForm';
import { getCurrentSubject } from 'app/utils/subjects';
import { ExamContext } from 'app/contexts/Exam';
import { contextExam } from 'app/shared/interfaces/exam';

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

export default function TrainerLobby() {
	const [value, setValue] = useState(0);
	const params = useParams();
	const { setCurrentSubject } = useContext<contextExam>(ExamContext);

	useEffect(() => {
		if (params.subject !== undefined) {
			const subject = getCurrentSubject(params.subject);
			setCurrentSubject(subject);
		}
	}, [params.subject]);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange}>
					<Tab label="resolver exámen" />
					<Tab label="entrenamiento" />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<ExamForm />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<TrainerForm />
			</CustomTabPanel>
		</Box>
	);
}
