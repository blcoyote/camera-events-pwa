import { useAuthState } from "react-firebase-hooks/auth";
import { UnauthenticatedPage } from "../pages/unauthenticated-page";
import { auth } from "../config/firebase";

export const UserGuard = (props: { children: React.ReactElement }) => {
    const [user, loading] = useAuthState(auth);
    if (loading && !user) {
        return (
            <div className="w-full h-dvh grid items-center justify-items-center">
                <span className="loading loading-ring loading-lg" />
            </div>
        );
    }

    if (user) {
        return props.children;
    }

    return <UnauthenticatedPage />;
};

