import { useDispatch } from "react-redux";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from "@entespotify/react-oauth-client-components";

import { logoutComplete } from "../../services/slice/ssoAuthSlice";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const { logout } = useAuth();

    const handleLogout = () => {
        try {
            logout();
        } finally {
            // ✅ Redux cleanup
            dispatch(logoutComplete());
        }
    };

    return (
        <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} />
        </ListItemButton>
    );
};

export default LogoutButton;
