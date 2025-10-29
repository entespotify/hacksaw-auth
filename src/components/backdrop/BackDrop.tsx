import { ReactNode } from "react";
import { Box } from "@mui/material";

export interface BackDropProps {
    children: ReactNode
}

function Backdrop({ children }: BackDropProps) {
    return (
        <Box
            sx={(theme) => ({
                width: "100vw",
                minHeight: "100vh",
                background: "linear-gradient(135deg, " + theme.palette.background.default + " 60%, " + theme.palette.background.paper + " 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            })}
        >
            {children}
        </Box>
    );
}

export default Backdrop;
