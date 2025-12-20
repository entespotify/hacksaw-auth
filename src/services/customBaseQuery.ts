import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import fetchClient from "./fetchClient";
import { getAuthToken } from "./utils";
import { RootState } from "./store";
import {
	authExpired,
	authRefreshRequested
} from "./slice/ssoAuthSlice";

type AuthPolicy = "strict" | "soft" | "none";

/**
 * Custom base query with:
 * - hook-based refresh signaling
 * - debounce for multiple 401s
 * - per-API auth rules
 * - React-owned logout
 */
const customBaseQuery = async (
	{ body, variables }: { body?: string | FormData | object; variables?: any },
	api: BaseQueryApi
) => {
	const state = api.getState() as RootState;

	const authPolicy: AuthPolicy = variables?.authPolicy ?? "strict";
	const noAuth = variables?.noAuth === true;

	let headers: Record<string, string> = {};

	// 1️⃣ Attach auth header
	if (!noAuth) {
		const tokenResponse = getAuthToken();

		if (!tokenResponse?.access_token) {
			if (authPolicy === "strict" && !state.ssoAuth.requiresLogout) {
				api.dispatch(authExpired());
			}

			return { error: { status: 401, data: "Unauthorized: No token" } };
		}

		headers.Authorization = `Bearer ${tokenResponse.access_token}`;
	}

	const args: FetchArgs = {
		url: variables.url,
		body,
		method: variables.method,
		params: variables.params,
		headers,
		credentials: "include"
	};

	try {
		const response = await fetchClient(args);

		// 2️⃣ Success
		if (response.ok) {
			return { data: await response.json() };
		}

		const errorData = await response.json();

		// 3️⃣ Handle 401 → request refresh (debounced)
		if (response.status === 401 && authPolicy !== "none") {
			const { refreshRequested, isRefreshing } = state.ssoAuth;

			if (!refreshRequested && !isRefreshing) {
				api.dispatch(authRefreshRequested());
			}

			return { error: { status: 401, data: errorData } };
		}

		// 4️⃣ Handle 403 → strict logout
		if (response.status === 403 && authPolicy === "strict") {
			if (!state.ssoAuth.requiresLogout) {
				api.dispatch(authExpired());
			}
		}

		return { error: { status: response.status, data: errorData } };
	} catch (error: any) {
		console.error("Error occurred while getting API response:", error);
		return {
			error: {
				status: error?.response?.status || 500,
				data: error
			}
		};
	}
};

export default customBaseQuery;
