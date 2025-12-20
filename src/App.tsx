import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "@entespotify/react-oauth-client-components";

import "./App.css";
import { setupStore } from "./services/store";
import { ThemeProvider } from "./theme/themeProvider";
import AppResourceRouter from "./AppResourceRouter";
import { ROUTER_BASE_NAME } from "./services/constants";
import { AppLoginInitializer } from "./components/no-render/app-login-initializer/appLoginInitializer";
import AuthWatcher from "./components/no-render/authwatcher/AuthWatcher";

const authConfig = {
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    authorizationEndpoint: process.env.REACT_APP_BASE_URL + "/o/authorize/",
    tokenEndpoint: process.env.REACT_APP_BASE_URL + "/o/token/",
    redirectUri: window.location.origin + `/${ROUTER_BASE_NAME}/auth/callback`,
    scope: "read",
    storage: "localStorage" as const,
};

const store = setupStore();

function App() {
    return (
        <div className="App">
            <AuthProvider config={authConfig}>
                <Provider store={store}>
                    <AppLoginInitializer />
                    <AuthWatcher />
                    <BrowserRouter basename={ROUTER_BASE_NAME}>
                        <ThemeProvider>
                            <AppResourceRouter />
                        </ThemeProvider>
                    </BrowserRouter>
                </Provider>
            </AuthProvider>
        </div>
    );
}

export default App;
