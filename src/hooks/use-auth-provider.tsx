import { auth, googleProvider } from "../config/firebase";
import {
	browserLocalPersistence,
	setPersistence,
	signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const useAuthProvider = () => {
	const [user, loading, error] = useAuthState(auth);
    const [token, setToken] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);

    const signInWithGoogle = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence).then(() => {
                return signInWithPopup(auth, googleProvider);
            });
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setLoginError(String(error));
        }
    };

    const handleLogout = () => {
        auth.signOut();
    };

    useEffect(() => {
        if (user) refreshToken();
    }, [user]);

    const refreshToken = () => {
        user?.getIdToken(true).then((token) => {
            setToken(token);
        });
    };

    const autenticated: boolean = user !== null && user !== undefined;

    return {
        user,
        loading,
        error,
        signInWithGoogle,
        handleLogout,
        refreshToken,
        autenticated,
        token,
        loginError,
    };
};
