interface NavbarMenuProps {
    handleLogout: () => void;
}

export const NavbarMenu = ({ handleLogout }: NavbarMenuProps) => {
    return (
        <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                    />
                </svg>
            </button>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
                <li>
                    <a href="/events">Events</a>
                </li>
                <li>
                    <a href="/settings">Settings</a>
                </li>
                <li>
                    <button className="btn-ghost" onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

