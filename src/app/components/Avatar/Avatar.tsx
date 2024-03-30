import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function updateColor(text: string) {
	const hexColor = stringToHslColor(text, 81, 56);
	return hexColor;
}

function stringToHslColor(str: string, s: number, l: number) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}

	const h = hash % 360;
	return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}

interface AvatarProps {
	firstName: string;
	lastName: string;
}

export default function Avatar(props: AvatarProps) {
	const { firstName, lastName } = props;
	const name = firstName + ' ' + lastName;
	const hexColor = updateColor(name);
	const text =
		firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
	return (
		<Box
			sx={{
				width: '80px',
				height: '80px',
				borderRadius: '100%',
				backgroundColor: hexColor,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography sx={{ color: '#fff' }} variant="h6">
				{text}
			</Typography>
		</Box>
	);
}
