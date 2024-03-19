import { Menu, rem } from "@mantine/core";
import { IconSettings, IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface AvatarMenuDropdownProps {
	logoutFn: () => void;
}

export function AvatarMenuDropdown(props: AvatarMenuDropdownProps) {
	const { logoutFn } = props;
	const navigation = useNavigate();
	return (
		<Menu.Dropdown>
			<Menu.Label>Application</Menu.Label>
			<Menu.Item
				leftSection={
					<IconSettings style={{ width: rem(14), height: rem(14) }} />
				}
				rightSection={"Settings"}
				onClick={() => navigation("/settings")}
			/>

			<Menu.Divider />

			<Menu.Label>Account</Menu.Label>
			<Menu.Item
				color="red"
				leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
				onClick={logoutFn}
			>
				Logout
			</Menu.Item>
		</Menu.Dropdown>
	);
}
