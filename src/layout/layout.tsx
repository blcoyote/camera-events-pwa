import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { UserGuard } from "../guards/user-guard";
import { MenuDrawer } from "../components/menu-drawer/menu-drawer";

export const Layout = () => {
    return (
        <div className="flex flex-col p-2 min-h-dvh bg-base-300 ">
            <div className="sticky top-3 z-20">
                <Navbar />
            </div>
            <MenuDrawer />
            <div className="h-full flex overflow-y-auto flex-col flex-grow">
                <UserGuard>
                    <div className="drawer-content">{<Outlet />}</div>
                </UserGuard>
            </div>
        </div>
    );
};

