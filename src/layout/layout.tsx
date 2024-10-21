import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { UserGuard } from "../guards/user-guard";
import { MenuDrawer } from "../components/menu-drawer/menu-drawer";

export const Layout = () => {
    return (
        <div className="flex flex-col p-2 min-h-dvh bg-base-300 ">
            <Navbar />
            <div className="h-full flex overflow-y-auto flex-col flex-grow z-10">
                <UserGuard>
                    <MenuDrawer>
                        <Outlet />
                    </MenuDrawer>
                </UserGuard>
            </div>
        </div>
    );
};

