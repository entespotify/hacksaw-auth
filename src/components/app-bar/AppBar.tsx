import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '@entespotify/react-oauth-client-components';
import { useSelector } from "react-redux";

import { RootState } from "../../services/store";
import useSafeNavigate from '../../hooks/useSafeNavigate';
import { FavIcon } from '../../icons/favicon';
import { ThemeToggleButton } from '../theme-toggle-button/ThemeToggleButton';
import { Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { stringAvatar } from './AppBar.utils';

export default function MenuAppBar() {
    const [open, setOpen] = React.useState(false);
    const { logout } = useAuth();
    const navigate = useSafeNavigate();
    const theme = useTheme();
    const profile = useSelector((state: RootState) => state.profile)

    const goHome = () => {
        navigate("/home");
    }

    const switchToProfile = () => {
        navigate("/profile");
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250, backgroundColor: theme.palette.background.default }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={"profile"} disablePadding>
                    <ListItemButton onClick={switchToProfile}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"logOut"} disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Log Out"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <ThemeToggleButton />
                        <Avatar
                            onClick={toggleDrawer(true)}
                            {...stringAvatar(profile.username, theme)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                anchor='right'
                onClose={toggleDrawer(false)}
            >
                {DrawerList}
            </Drawer>
        </>
    );
}
