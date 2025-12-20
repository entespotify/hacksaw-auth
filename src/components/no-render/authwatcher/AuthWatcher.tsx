import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@entespotify/react-oauth-client-components";

import { RootState } from "../../../services/store";
import {
    authRefreshStarted,
    authRefreshSucceeded,
    authRefreshFailed,
    logoutComplete
} from "../../../services/slice/ssoAuthSlice";

const AuthWatcher = () => {
    const dispatch = useDispatch();
    const { logout, service } = useAuth();

    const {
        refreshRequested,
        requiresLogout
    } = useSelector((state: RootState) => state.ssoAuth);

    /**
     * 🔁 Handle refresh-token flow (hook-owned)
     */
    useEffect(() => {
        if (!refreshRequested) return;

        const refresh = async () => {
            dispatch(authRefreshStarted());

            try {
                await service.refreshTokenIfNeeded(); // ✅ hook-based refresh
                dispatch(authRefreshSucceeded());
            } catch (err) {
                dispatch(authRefreshFailed());
            }
        };

        refresh();
    }, [refreshRequested, dispatch, service]);

    /**
     * 🚪 Handle logout (hook-owned)
     */
    useEffect(() => {
        if (!requiresLogout) return;

        const performLogout = async () => {
            try {
                await logout(); // ✅ external auth logout
            } finally {
                dispatch(logoutComplete()); // ✅ close Redux loop
            }
        };

        performLogout();
    }, [requiresLogout, logout, dispatch]);

    return null;
};

export default AuthWatcher;
