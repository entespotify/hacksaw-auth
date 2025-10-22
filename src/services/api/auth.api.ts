import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "../customBaseQuery";


export const authApi = createApi({
	baseQuery: customBaseQuery,
	reducerPath: 'authApi',
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				body: { ...credentials },
				variables: {
					url: '/api/token/',
					method: 'POST',
					noAuth: true
				}
			})
		}),
		register: builder.mutation({
			query: (userInfo) => ({
				body: { ...userInfo },
				variables: {
					url: '/api/users/',
					method: 'POST',
					noAuth: true
				}
			})
		}),
		profile: builder.query({
			query: () => ({
				variables: {
					url: '/api/auth/me/',
					method: 'GET'
				}
			})
		})
	}),
});

export const { useLoginMutation, useRegisterMutation, useProfileQuery } = authApi;
