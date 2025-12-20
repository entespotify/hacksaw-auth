import * as React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
}
    from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";

import { RootState } from "../../services/store";
import useSafeNavigate from '../../hooks/useSafeNavigate';
import { FavIcon } from '../../icons/favicon';
import { ThemeToggleButton } from '../theme-toggle-button/ThemeToggleButton';
import { stringAvatar } from './AppBar.utils';
import LogoutButton from '../logout-button/Logoutbutton';
import { HOME_ROUTE } from '../../services/constants';

export default function MenuAppBar() {
    const [open, setOpen] = React.useState(false);
    const navigate = useSafeNavigate();
    const theme = useTheme();
    const profile = useSelector((state: RootState) => state.profile);

    const goHome = () => {
        navigate(HOME_ROUTE);
    }

    const switchToProfile = () => {
        navigate("/profile");
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
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
                    <LogoutButton />
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
                closeAfterTransition={true}
            >
                {DrawerList}
            </Drawer>
        </>
    );
}
