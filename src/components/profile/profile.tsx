import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Avatar, Button, Chip, Grid } from "@mui/material";

import { RootState } from "../../services/store";
import { useProfileQuery } from "../../services/api/auth.api";
import { loadProfile } from "../../services/slice/userSlice";
import { Permission } from "../../types/authentication";

const Profile: FC = () => {
    const { data: profileData, isLoading, isError } = useProfileQuery("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (profileData) {
            dispatch(loadProfile(profileData));
        }
    }, [profileData]);

    const profile = useSelector((state: RootState) => state.profile);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    if (isError || !profileData) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography variant="h6" color="error">
                    Failed to load profile data.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            minHeight="100vh"
            bgcolor="background.default"
            color="text.primary"
            gap={3}
        >
            {/* Header Section */}
            <Box
                sx={(theme) => ({
                    height: 300,
                    background: "linear-gradient(to right," + theme.palette.primary.light + ", " + theme.palette.primary.dark + ")",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                })}
            >
            </Box>

            {/* Content Section */}
            <Box sx={{ p: 3, display: "flex", justifyContent: "space-around" }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar
                        sx={(theme) => ({
                            width: 100,
                            height: 100,
                            border: "4px solid " + theme.palette.primary.light,
                        })}
                    />
                    <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}>
                        @{profile.username || "Unknown User"}
                    </Typography>
                    {(profile.first_name && profile.last_name) &&
                        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}>
                            {profile.first_name || ""} {profile.last_name || ""}
                        </Typography>
                    }
                    <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}>
                        {profile.email || "No email provided"}
                    </Typography>

                    <Chip label={profile.is_staff ? "Admin" : "User"} color="primary" sx={{ mb: 2 }} />

                    <Grid container spacing={2} justifyContent="center">
                        <Grid>
                            <Button variant="contained" color="primary" sx={{ px: 3 }}>
                                Edit Profile
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ mt: 3 }}>

                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        Permissions
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap" flexDirection="column">
                        {profileData.permissions.map((permission: Permission) => (
                            <Chip key={permission.id} label={permission.name} variant="outlined" />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Profile;