import { ReactNode } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

export const MenuDrawer = ({ children }: { children: ReactNode }) => {
    const [signOut] = useSignOut(auth);
    return (
        <div className="drawer z-50">
            <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">{children}</div>
            <div className="drawer-side">
                <label
                    htmlFor="menu-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul
                    tabIndex={0}
                    className="menu bg-base-100 text-base-content min-h-full w-80 gap-2 p-4"
                >
                    <li>
                        <a href="/events">Events</a>
                    </li>
                    <li>
                        <a href="/settings">Settings</a>
                    </li>
                    <li>
                        <button className="btn-ghost" onClick={signOut}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

