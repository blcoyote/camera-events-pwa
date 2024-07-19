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
    const [loggedOut, setLoggedOut] = useState<boolean>(false);

    const signInWithGoogle = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence).then(() => {
                return signInWithPopup(auth, googleProvider);
            });
        } catch (error) {
            console.error("Error signing in with Google:", error);
        } finally {
            setLoggedOut(false);
        }
    };

    const handleLogout = () => {
        auth.signOut();
        setLoggedOut(true);
    };

    useEffect(() => {
        if (user) refreshToken();
    }, [user]);

    const refreshToken = () => {
        user?.getIdToken(true).then((token) => {
            localStorage.setItem("token", token);
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
        loggedOut,
    };
};

