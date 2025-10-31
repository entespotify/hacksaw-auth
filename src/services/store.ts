import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { NavigateFunction } from 'react-router-dom';

import { authApi } from './api/auth.api';
import { createAuthMiddleware } from './middleware/authMiddleware';
import authSlice from './slice/authSlice';
import userSlice from './slice/userSlice';



export const setupStore = (navigate: NavigateFunction): EnhancedStore => {
	const store = configureStore({
		reducer: {
			[authApi.reducerPath]: authApi.reducer,
			auth: authSlice,
			profile: userSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(authApi.middleware)
				.concat(createAuthMiddleware(navigate)),
	});

	setupListeners(store.dispatch);

	return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;
export type AppDispatch = ReturnType<ReturnType<typeof setupStore>['dispatch']>;