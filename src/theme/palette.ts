import { PaletteOptions } from '@mui/material/styles';

export const lightPalette: PaletteOptions = {
    mode: 'light',
    primary: {
        main: '#1976d2',
        light: '#63a4ff',
        dark: '#004ba0',
        contrastText: '#fff',
    },
    secondary: {
        main: '#9c27b0',
        light: '#d05ce3',
        dark: '#6a0080',
        contrastText: '#fff',
    },
    error: {
        main: '#d32f2f',
    },
    warning: {
        main: '#ed6c02',
    },
    info: {
        main: '#0288d1',
    },
    success: {
        main: '#2e7d32',
    },
    background: {
        default: '#f5f5f5',
        paper: '#ffffff',
    },
    text: {
        primary: '#111',
        secondary: '#333',
    },
};

export const darkPalette: PaletteOptions = {
    mode: 'dark',
    primary: {
        main: '#26c6da',
        light: '#6ff9ff',
        dark: '#0095a8',
        contrastText: '#000',
    },
    secondary: {
        main: '#80deea',
        light: '#b4ffff',
        dark: '#4bacb8',
        contrastText: '#000',
    },
    error: {
        main: '#ef5350',
    },
    warning: {
        main: '#ffb74d',
    },
    info: {
        main: '#4fc3f7',
    },
    success: {
        main: '#81c784',
    },
    background: {
        default: '#181c24',
        paper: '#232936',
    },
    text: {
        primary: '#ffffff',
        secondary: '#b2dfdb',
    },
    divider: 'rgba(178, 223, 219, 0.2)',
};
