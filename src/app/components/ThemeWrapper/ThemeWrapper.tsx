import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

declare module '@mui/material/styles' {
	interface Theme {
		custom: {
			background: {
				light: string;
				main: string;
			};
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		custom?: {
			background?: {
				light?: string;
				main?: string;
			};
		};
	}
}

const theme = createTheme({
	palette: {
		background: {
			paper: '#eeeeee',
			default: '#bbbbbb',
		},
	},
	custom: {
		background: {
			light: '#eeeeee',
			main: '#bbbbbb',
		},
	},
});

export default function ThemeWrapper({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
