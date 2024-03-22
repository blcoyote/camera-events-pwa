import {
	AppShell,
	Burger,
	Avatar,
	Button,
	Flex,
	Container,
	Menu,
	Group,
	Skeleton,
	ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAuthProvider } from "../hooks/use-auth-provider";
import { AvatarMenuDropdown } from "../components/avatar-menu-dropdown";
import { IconHome2 } from "@tabler/icons-react";
import { NavBar } from "../components/navbar/navbar";
import { Link, Outlet } from "react-router-dom";
import { UserGuard } from "../guards/user-guard";

export const Layout = () => {
	const { user, loading, signInWithGoogle, handleLogout } = useAuthProvider();
	const [opened, { toggle }] = useDisclosure();

	const avatar = () => {
		return (
			<Menu shadow="md" width={200} trigger="hover">
				<Menu.Target>
					<Avatar src={user?.photoURL} alt={user?.displayName ?? "username"} />
				</Menu.Target>
				<AvatarMenuDropdown logoutFn={handleLogout} />
			</Menu>
		);
	};

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"

		>
			<AppShell.Header>
				<Flex
					h="100%"
					px="md"
					direction={"row"}
					gap="md"
					justify="flex-start"
					align="center"
				>
					<Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
					<Link to="/">
						<IconHome2 />
					</Link>

					<Group style={{ marginLeft: "auto" }}>
						{user && avatar()}
						{loading && <Skeleton width={40} height={40} />}
						{!user && !loading && (
							<Button
								type="button"
								onClick={signInWithGoogle}
								style={{ marginLeft: "auto" }}
							>
								login
							</Button>
						)}
					</Group>
				</Flex>
			</AppShell.Header>
			{!loading && <NavBar onClick={toggle} />}
			<AppShell.Main>
				<Container>
					<UserGuard>
						<ScrollArea offsetScrollbars type="never" h={'90vh'} style={{overflow: 'auto'}}>
							<Outlet />
						</ScrollArea>
					</UserGuard>
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
