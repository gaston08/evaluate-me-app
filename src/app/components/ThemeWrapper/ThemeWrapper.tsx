import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

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

export default function ThemeWrapper({ children }: any) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
