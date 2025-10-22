import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from '@entespotify/react-oauth-client-components'

export const ProtectedLayout = () => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ path: location.pathname }} />;
	} else {

		return (
			<>
				<Outlet />
			</>
		)
	}
}