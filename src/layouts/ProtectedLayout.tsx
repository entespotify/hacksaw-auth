import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from '@entespotify/react-oauth-client-components'
import MenuAppBar from "../components/app-bar/AppBar";

export const ProtectedLayout = () => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ path: location.pathname }} />;
	} else {

		return (
			<>
				<MenuAppBar/>
				<Outlet />
			</>
		)
	}
}