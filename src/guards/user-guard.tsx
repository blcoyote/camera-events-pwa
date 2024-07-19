import { useAuthProvider } from "../hooks/use-auth-provider";
import { UnauthenticatedPage } from "../pages/unauthenticated-page";

export const UserGuard = (props: { children: React.ReactElement }) => {
    const { user, loading } = useAuthProvider();

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

