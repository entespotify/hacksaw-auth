import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
	isAuthenticated: boolean;
	requiresLogout: boolean;

	refreshRequested: boolean;
	isRefreshing: boolean;
	refreshFailed: boolean;
}

const initialState: AuthState = {
	isAuthenticated: true,
	requiresLogout: false,

	refreshRequested: false,
	isRefreshing: false,
	refreshFailed: false
};

export const ssoAuthSlice = createSlice({
	name: 'ssoAuth',
	initialState,
	reducers: {
		/**
		 * Dispatched by baseQuery on first 401
		 * (debounced by flags)
		 */
		authRefreshRequested(state) {
			if (!state.isRefreshing) {
				state.refreshRequested = true;
			}
		},

		/**
		 * Dispatched by React AuthController
		 * right before calling refreshToken()
		 */
		authRefreshStarted(state) {
			state.isRefreshing = true;
			state.refreshRequested = false;
		},

		/**
		 * Dispatched by React after refresh succeeds
		 */
		authRefreshSucceeded(state) {
			state.isRefreshing = false;
			state.refreshFailed = false;
			state.isAuthenticated = true;
		},

		/**
		 * Dispatched by React if refresh fails
		 */
		authRefreshFailed(state) {
			state.isRefreshing = false;
			state.refreshFailed = true;
			state.requiresLogout = true;
		},

		/**
		 * Dispatched by baseQuery if refresh is not allowed
		 * (strict auth APIs)
		 */
		authExpired(state) {
			state.requiresLogout = true;
		},

		/**
		 * Dispatched by React after external logout completes
		 */
		logoutComplete(state) {
			state.isAuthenticated = false;
			state.requiresLogout = false;
			state.isRefreshing = false;
			state.refreshRequested = false;
			state.refreshFailed = false;
		}
	}
});

export const {
	authRefreshRequested,
	authRefreshStarted,
	authRefreshSucceeded,
	authRefreshFailed,
	authExpired,
	logoutComplete
} = ssoAuthSlice.actions;

export default ssoAuthSlice.reducer;
