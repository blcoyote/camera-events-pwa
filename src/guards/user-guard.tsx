import { Flex, Loader } from "@mantine/core";
import { useAuthProvider } from "../hooks/use-auth-provider";
import { UnauthenticatedPage } from "../pages/unauthenticated-page";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const UserGuard = (props: { children: React.ReactElement }) => {
    const { user, loading, autenticated, error } = useAuthProvider();

    useEffect(() => {
        function ToastDisplay() {
            return (
                <div>
                    <p>
                        <b>{user?.email}</b>
                    </p>
                    <p>{"authenticated:" + autenticated}</p>
                    <p>{"error:" + error}</p>
                </div>
            );
        }
        if (!loading) {
            toast.info(<ToastDisplay />);
        }
    }, [user, loading]);

    if (loading) {
        return (
            <Flex mih={"10rem"} justify="center" align="center" direction="row">
                <Loader />
            </Flex>
        );
    }

    if (user) {
        return props.children;
    }

    return <UnauthenticatedPage />;
};
