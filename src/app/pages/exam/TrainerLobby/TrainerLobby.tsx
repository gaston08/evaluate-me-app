import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TrainerForm from './TrainerForm';
import ExamForm from './ExamForm';

interface TabPanelProps {
	children?: React.ReactNode;
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

export default function BasicTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
				<TrainerForm />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<ExamForm />
			</CustomTabPanel>
		</Box>
	);
}
