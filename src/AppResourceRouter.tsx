import { useNavigate, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { setupStore } from "./services/store";
import { PublicLayout } from "./layouts/PublicLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import CreateAccountPage from "./pages/createAccount";
import RegistrationSuccessPage from "./pages/registrationSuccess";
import { LoginPage, CallbackPage } from "@entespotify/react-oauth-client-components";
import ProfilePage from "./pages/profile";
import { AppLoginInitializer } from "./components/no-render/app-login-initializer/appLoginInitializer";

const AppResourceRouter = () => {
    const navigate = useNavigate();
    const store = setupStore(navigate);

    const postLoginRedirectCallback = () => {
        navigate("/home");
    }

    return (
        <Provider store={store}>
            <AppLoginInitializer />
            <Routes>
                <Route path="/" element={<PublicLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="auth/callback" element={<CallbackPage onSuccessCallback={postLoginRedirectCallback} />} />
                    <Route path="register" element={<PublicLayout />}>
                        <Route index element={<CreateAccountPage />} />
                        <Route path="success" element={<RegistrationSuccessPage />} />
                    </Route>
                </Route>
                <Route path="/" element={<ProtectedLayout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="profile" element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Provider>
    );
};

export default AppResourceRouter;