import { Middleware } from "@reduxjs/toolkit";
import { logout } from "../slice/authSlice";
import { RootState } from "../store";
import { NavigateFunction } from "react-router-dom";

export const createAuthMiddleware = (navigate: NavigateFunction): Middleware<{}, RootState> => {
    const authMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
        if (action.type.endsWith("/rejected")) {
            const { error } = action.payload || {};
            if (error?.status === 401 || error?.status === 403) {
                // Dispatch logout action
                store.dispatch(logout());

                // Redirect to login page
                navigate("/login");
            }
        }

        return next(action);
    };

    return authMiddleware;
};