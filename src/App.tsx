import { HashRouter } from "react-router-dom";
import { AuthProvider } from "@entespotify/react-oauth-client-components";

import "./App.css";
import { ThemeProvider } from "./theme/themeProvider";
import AppResourceRouter from "./AppResourceRouter";

const authConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    authorizationEndpoint: process.env.REACT_APP_BASE_URL + "/o/authorize/",
    tokenEndpoint: process.env.REACT_APP_BASE_URL + "/o/token/",
    redirectUri: window.location.origin + window.location.pathname,
    scope: "read",
    storage: "localStorage" as const,
};

function App() {
    return (
        <div className="App">
            <AuthProvider config={authConfig}>
                <HashRouter>
                    <ThemeProvider>
                        <AppResourceRouter />
                    </ThemeProvider>
                </HashRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
