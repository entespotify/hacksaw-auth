import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@entespotify/react-oauth-client-components";
import AppResourceRouter from "./AppResourceRouter";

import "./App.css";

const authConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    authorizationEndpoint: process.env.REACT_APP_BASE_URL + "/o/authorize/",
    tokenEndpoint: process.env.REACT_APP_BASE_URL + "/o/token/",
    redirectUri: window.location.origin + "/auth/callback",
    scope: "read",
    storage: "localStorage" as const,
};

function App() {
    return (
        <div className="App">
            <AuthProvider config={authConfig}>
                <BrowserRouter>
                    <AppResourceRouter />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
