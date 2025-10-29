import { Components, Theme } from '@mui/material/styles';

export const components: Components<Omit<Theme, 'components'>> = {
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                padding: '8px 20px',
            },
            containedPrimary: {
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                },
            },
        },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                borderRadius: 0,
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            rounded: {
                borderRadius: 12,
            },
        },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                backgroundColor: "#232936",
                borderRadius: 6,
            },
        },
    },
};
