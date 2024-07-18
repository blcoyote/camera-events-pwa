import { AppShell, Menu, rem, NavLink, Paper } from "@mantine/core";
import { useAuthProvider } from "../../hooks/use-auth-provider";
import {
    IconCamera,
    IconLogin,
    IconLogout,
    IconSettings,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "@mantine/hooks";

export function NavBar(
    props: Readonly<{
        onClick: () => void;
        opened: boolean;
    }>,
) {
    const { autenticated, signInWithGoogle, handleLogout } = useAuthProvider();
    const { onClick, opened } = props;
    const navigate = useNavigate();
    const ref = useClickOutside(() => {
        setTimeout(() => {
            opened && onClick();
        }, 50);
    }, ["mouseup", "touchend"]);

    return (
        <AppShell.Navbar p="md" w={"12rem"}>
            {autenticated && (
                <Menu shadow="md" opened={opened}>
                    <Paper ref={ref} h={"100%"}>
                        <Menu.Label>Camera events</Menu.Label>
                        <NavLink
                            leftSection={
                                <IconCamera
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                            rightSection={"Events"}
                            onClick={() => {
                                navigate("/", { replace: true });
                                onClick();
                            }}
                        />
                        <NavLink
                            leftSection={
                                <IconSettings
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                            rightSection={"Settings"}
                            onClick={() => {
                                navigate("/settings", { replace: true });
                                onClick();
                            }}
                        />
                        <Menu.Divider />
                        <NavLink
                            color="red"
                            leftSection={
                                <IconLogout
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                            rightSection={"Logout"}
                            onClick={() => {
                                handleLogout();
                                onClick();
                            }}
                        />
                    </Paper>
                </Menu>
            )}
            {!autenticated && authenticateMenu(signInWithGoogle)}
        </AppShell.Navbar>
    );
}

function authenticateMenu(signInWithGoogle: () => Promise<void>) {
    return (
        <Menu shadow="md" opened>
            <NavLink
                leftSection={
                    <IconLogin style={{ width: rem(14), height: rem(14) }} />
                }
                rightSection={"Login"}
                onClick={signInWithGoogle}
            />
        </Menu>
    );
}

