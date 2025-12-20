import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from './api/auth.api';
import authSlice from './slice/authSlice';
import ssoAuthSlice from './slice/ssoAuthSlice';
import userSlice from './slice/userSlice';



export const setupStore = () => {
	const store = configureStore({
		reducer: {
			[authApi.reducerPath]: authApi.reducer,
			auth: authSlice,
			ssoAuth: ssoAuthSlice,
			profile: userSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(authApi.middleware)
	});

	setupListeners(store.dispatch);

	return store;
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];