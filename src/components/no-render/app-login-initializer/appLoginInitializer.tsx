import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "@entespotify/react-oauth-client-components";

import { useProfileQuery } from "../../../services/api/auth.api";
import { loadProfile } from "../../../services/slice/userSlice";

export const AppLoginInitializer = () => {
    const { isAuthenticated } = useAuth();
    const { data: profileData } = useProfileQuery("", { skip: !isAuthenticated });
    const dispatch = useDispatch();

    useEffect(() => {
        if (profileData) {
            dispatch(loadProfile(profileData));
        }
    }, [profileData, dispatch]);

    return null;
};
