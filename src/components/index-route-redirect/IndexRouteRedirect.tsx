import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IndexRouteRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const fullUrl = window.location.href;
		const baseUrl = fullUrl.split("#")[0];
		const url = new URL(baseUrl);
		const searchParams = url.searchParams;
		const code = searchParams.get("code");
		const state = searchParams.get("state");
		const error = searchParams.get("error");

		// SSO redirect (contains OAuth params)
		if (code || error || state) {
			navigate(`/auth/callback`, { replace: true });
		} else {
			navigate("/home", { replace: true });
		}
	}, [navigate]);

	return null;
};

export default IndexRouteRedirect;
