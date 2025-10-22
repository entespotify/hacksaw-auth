import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/auth.api';
import authSlice from './slice/authSlice';
import { createAuthMiddleware } from './middleware/authMiddleware';
import { NavigateFunction } from 'react-router-dom';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export const setupStore = (navigate: NavigateFunction):ToolkitStore  => {
  const store = configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(createAuthMiddleware(navigate)), // Add the authMiddleware here
  });

  setupListeners(store.dispatch);

  return store;
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<ReturnType<typeof setupStore>['getState']>;
export type AppDispatch = ReturnType<ReturnType<typeof setupStore>['dispatch']>;