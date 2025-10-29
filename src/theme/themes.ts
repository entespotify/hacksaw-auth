import { createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';

export const lightTheme = createTheme({
	palette: lightPalette,
	typography,
	components,
});

export const darkTheme = createTheme({
	palette: darkPalette,
	typography,
	components,
});
