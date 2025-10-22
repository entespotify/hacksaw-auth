import { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import fetchClient from "./fetchClient";
import { getAuthToken } from "./utils";

/**
 * Custom base query for all API endpoints
 * @param param0 request body and variables
 * @param api base query API object
 * @returns API response from fetch client
 */
const customBaseQuery = async (
	{ body, variables }: { body?: string | FormData | object; variables?: any },
	api: BaseQueryApi
) => {
	try {
		let headers = {};
		if (!variables?.noAuth) {
			const tokenResponse = getAuthToken();
            if (!tokenResponse || !tokenResponse.access_token) {
                return { error: { status: 401, data: "Unauthorized: No token found" } };
            }

            // Set the Authorization header with the Bearer token
            headers = {
                Authorization: `Bearer ${tokenResponse.access_token}`,
            };
		}

		const args: FetchArgs = {
			url: variables.url,
			body: body,
			method: variables.method,
			params: variables.params,
			headers: {
				...headers,
			},
			credentials: "include",
		};

		const response = await fetchClient(args);

		if (response.ok) {
			const result = await response.json();
			return { data: result };
		} else {
			return { error: { status: response.status, data: await response.json() } };
		}
	} catch (error: any) {
		console.error("Error occurred while getting API response:", error);
		return { error: { status: error.response?.status || 500, data: error } };
	}
};

export default customBaseQuery;
