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
	Image,
} from "@mantine/core";
import { useAuthProvider } from "../hooks/use-auth-provider";
import { AvatarMenuDropdown } from "../components/avatar-menu-dropdown";
import { NavBar } from "../components/navbar/navbar";
import { Link, Outlet } from "react-router-dom";
import { UserGuard } from "../guards/user-guard";
import { useDisclosure } from "@mantine/hooks";

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
	const handleBurgerClick = () => {
		if (!opened) toggle();
	};

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !opened } }}
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
					<Burger
						opened={opened}
						onClick={handleBurgerClick}
						size="sm"
						hiddenFrom="sm"
					/>
					<Link to="/">
						<Image radius="md" src="/pwa-64x64.png" h={50} w={50} />
					</Link>

					<Group style={{ marginLeft: "auto" }}>
						{user && avatar()}
						{loading && <Skeleton width={40} height={40} />}
						{!user && !loading && (
							<Button
								type="button"
								onClick={(e)=>{
									e.preventDefault()
									signInWithGoogle()

								}}
								style={{ marginLeft: "auto" }}
							>
								login
							</Button>
						)}
					</Group>
				</Flex>
			</AppShell.Header>
			{!loading && <NavBar onClick={toggle} opened={opened} />}
			<AppShell.Main>
				<Container style={{ paddingRight: 0 }}>
					<UserGuard>
						<ScrollArea
							offsetScrollbars
							type="scroll"
							h={"90vh"}
							w={"100%"}
							style={{
								overflow: "auto",
							}}
						>
							<Outlet />
						</ScrollArea>
					</UserGuard>
				</Container>
			</AppShell.Main>
		</AppShell>
	);
};
