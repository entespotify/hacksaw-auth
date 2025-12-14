import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@entespotify/react-oauth-client-components";

import "./App.css";
import { ThemeProvider } from "./theme/themeProvider";
import AppResourceRouter from "./AppResourceRouter";
import { ROUTER_BASE_NAME } from "./services/constants";

const authConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    authorizationEndpoint: process.env.REACT_APP_BASE_URL + "/o/authorize/",
    tokenEndpoint: process.env.REACT_APP_BASE_URL + "/o/token/",
    redirectUri: window.location.origin + `/${ROUTER_BASE_NAME}/auth/callback`,
    scope: "read",
    storage: "localStorage" as const,
};

function App() {
    return (
        <div className="App">
            <AuthProvider config={authConfig}>
                <BrowserRouter basename={ROUTER_BASE_NAME}>
                    <ThemeProvider>
                        <AppResourceRouter />
                    </ThemeProvider>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
