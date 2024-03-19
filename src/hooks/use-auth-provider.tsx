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

	const signInWithGoogle = async () => {
		try {
			await setPersistence(auth, browserLocalPersistence).then(() => {
				return signInWithPopup(auth, googleProvider);
			});
		} catch (error) {
			console.error("Error signing in with Google:", error);
		}
	};

	const handleLogout = () => {
		auth.signOut();
	};

	useEffect(() => {
		user?.getIdToken().then((token) => {
			setToken(token);
		});
	}, [user]);

	const autenticated: boolean = user !== null && user !== undefined;

	return {
		user,
		loading,
		error,
		signInWithGoogle,
		handleLogout,
		autenticated,
		token,
	};
};
