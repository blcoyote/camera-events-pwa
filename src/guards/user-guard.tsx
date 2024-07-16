import { Flex, Loader } from "@mantine/core";
import { useAuthProvider } from "../hooks/use-auth-provider";
import { UnauthenticatedPage } from "../pages/unauthenticated-page";

export const UserGuard = (props: { children: React.ReactElement }) => {
	const { user, loading, error } = useAuthProvider();

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

    return <UnauthenticatedPage error={error} />;
};
