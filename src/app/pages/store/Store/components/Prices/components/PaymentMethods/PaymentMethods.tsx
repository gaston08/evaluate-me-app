import Box from '@mui/material/Box';
import Payment from './Payment.tsx';
import Divider from '@mui/material/Divider';

export default function PaymentMethods() {
	return (
		<Box sx={{ width: '100%', pl: 3 }}>
			<Divider sx={{ mb: 3 }} />
			<Payment />
		</Box>
	);
}
