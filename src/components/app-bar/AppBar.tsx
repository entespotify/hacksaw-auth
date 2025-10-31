import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@entespotify/react-oauth-client-components';
import useSafeNavigate from '../../hooks/useSafeNavigate';
import { FavIcon } from '../../icons/favicon';
import { ThemeToggleButton } from '../theme-toggle-button/ThemeToggleButton';

export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { logout } = useAuth();
    const navigate = useSafeNavigate();
    const theme = useTheme();

    const goHome = () => {
        navigate("/home");
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const switchToProfile = () => {
        handleClose();
        navigate("/profile");
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <IconButton
                    size="large"
                    aria-label="home"
                    onClick={goHome}
                    sx={{
                        color: theme.palette.text.secondary,
                        '&:hover': {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    <FavIcon />
                </IconButton>
                <div>
                    <ThemeToggleButton />
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        sx={{
                            color: theme.palette.text.secondary,
                            '&:hover': {
                                color: theme.palette.primary.main,
                            },
                        }}
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={switchToProfile}>Profile</MenuItem>
                        <MenuItem onClick={logout}>Log out</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}
