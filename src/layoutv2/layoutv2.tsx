import { Outlet } from "react-router-dom";
import { DrawerSidebar } from "../components/drawerv2/drawer-sidebar";
import { Navbar } from "../components/navbarv2/navbar";

export const Layout = () => {
    return (
        <div className="drawer">
            <input
                id="drawer-sidebar"
                type="checkbox"
                className="drawer-toggle"
            />

            <div className="drawer-content flex flex-col">
                <Navbar />
                <Outlet />
            </div>
            <DrawerSidebar />
        </div>
    );
};

