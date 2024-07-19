import { useAuthProvider } from "../hooks/use-auth-provider";
import { UnauthenticatedPage } from "../pages/unauthenticated-page";

export const UserGuard = (props: { children: React.ReactElement }) => {
    const { user, loading } = useAuthProvider();

    if (loading) {
        return (
            <div className="w-dvw flex flex-row items-center justify-items-center">
                <span className="loading loading-ring loading-lg" />
            </div>
        );
    }

    if (user) {
        return props.children;
    }

    return <UnauthenticatedPage />;
};

