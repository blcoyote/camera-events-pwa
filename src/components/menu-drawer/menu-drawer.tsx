import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import {
    HiAdjustmentsHorizontal,
    HiCalendarDays,
    HiArrowTopRightOnSquare,
} from "react-icons/hi2";

export const MenuDrawer = () => {
    const [signOut] = useSignOut(auth);
    return (
        <div className="drawer z-20">
            <input id="menu-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-side">
                <label
                    htmlFor="menu-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div
                    tabIndex={0}
                    className="menu bg-base-100 text-base-content min-h-full w-80 gap-2 p-4"
                >
                    <div className="grid grid-cols-1 justify-items-center gap-4">
                        <h2 className="text-lg font-bold">Camera Events</h2>
                        <img
                            src="/pwa-64x64.png"
                            alt="logo"
                            className="w-20 h-20"
                        />
                    </div>
                    <div className="divider" />
                    <div className="flex flex-col gap-4">
                        <a
                            href="/events"
                            className="btn btn-ghost lex flex-row justify-between"
                        >
                            <HiCalendarDays size={24} />
                            <p className="w-24 flex justify-start">Events</p>
                        </a>

                        <a
                            href="/settings"
                            className="btn btn-ghost flex flex-row justify-between"
                        >
                            <HiAdjustmentsHorizontal size={24} />
                            <p className="w-24 flex justify-start">Settings</p>
                        </a>
                    </div>
                    <div className="divider" />
                    <li>
                        <button
                            className="btn btn-ghost flex flex-row justify-between"
                            onClick={signOut}
                        >
                            <HiArrowTopRightOnSquare size={24} />
                            <p className="w-24 flex justify-start">Logout</p>
                        </button>
                    </li>
                </div>
            </div>
        </div>
    );
};

