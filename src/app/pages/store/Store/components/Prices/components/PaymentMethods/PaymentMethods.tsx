import { ReactNode, SyntheticEvent, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Transfer from './Transfer.tsx';
import Payment from './Payment.tsx';

interface TabPanelProps {
	children?: ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{' '}
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}{' '}
		</div>
	);
}

export default function PaymentMethods() {
	const [value, setValue] = useState<number>(1);
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange}>
					<Tab label="Pago inmediato" />
					<Tab label="Transferencia" />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<Payment />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<Transfer />
			</CustomTabPanel>
		</Box>
	);
}
