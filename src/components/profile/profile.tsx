import { FC } from "react";
import { Box, Typography, Avatar, Button, Chip, Grid, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProfileQuery } from "../../services/api/auth.api";
import { Permission } from "../../types/authentication";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#26c6da" },
        background: { default: "#181c24", paper: "#232936" },
        text: { primary: "#fff", secondary: "#b2dfdb" },
    },
    typography: {
        fontFamily: [
            'Inter',
            'Roboto',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif'
        ].join(','),
    },
});

const Profile: FC = () => {
    const { data: profileData, isLoading, isError } = useProfileQuery("");
    const navigate = useNavigate();

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
        <ThemeProvider theme={darkTheme}>
            <Box
                minHeight="100vh"
                bgcolor="background.default"
                color="text.primary"
                gap={3}
            >
                {/* Header Section */}
                <Box
                    sx={{
                        height: 300,
                        background: "linear-gradient(to right, #232936, #26c6da)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                </Box>

                {/* Content Section */}
                <Box sx={{ p: 3, display: "flex", justifyContent: "space-around" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                border: "4px solid white",
                            }}
                        >
                            {profileData.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 1 }}>
                            @{profileData.username || "Unknown User"}
                        </Typography>
                        {(profileData.first_name && profileData.last_name) &&
                            <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}>
                                {profileData.first_name || ""} {profileData.last_name || ""}
                            </Typography>
                        }
                        <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}>
                            {profileData.email || "No email provided"}
                        </Typography>

                        <Chip label={profileData.is_staff ? "Admin" : "User"} color="primary" sx={{ mb: 2 }} />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Button variant="contained" color="primary" sx={{ px: 3 }}>
                                    Edit Profile
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary" sx={{ px: 3 }} onClick={() => navigate("/home") }>
                                    Home
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
        </ThemeProvider>
    );
};

export default Profile;