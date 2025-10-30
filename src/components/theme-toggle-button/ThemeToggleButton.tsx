import { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ColorModeContext } from '../../theme/themeProvider';
import { useTheme } from '@mui/material/styles';

export const ThemeToggleButton = () => {
    const { toggleColorMode } = useContext(ColorModeContext);
    const theme = useTheme();

    const isDark = theme.palette.mode === 'dark';

    return (
        <Tooltip title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
            <IconButton
                color="inherit"
                onClick={toggleColorMode}
                sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                        color: theme.palette.primary.main,
                    },
                }}
            >
                {isDark ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Tooltip>
    );
};
