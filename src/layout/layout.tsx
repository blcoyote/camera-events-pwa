import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import { UserGuard } from "../guards/user-guard";

export const Layout = () => {
    return (
        <div className="flex flex-col p-2 min-h-dvh bg-stone-200 ">
            <Navbar />
            <div className="h-full flex overflow-y-auto flex-col flex-grow ">
                <UserGuard>
                    <Outlet />
                </UserGuard>
            </div>
        </div>
    );
};

