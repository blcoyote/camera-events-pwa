export const DrawerSidebar = () => {
    return (
        <div className="drawer-side">
            <label
                htmlFor="drawer-sidebar"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <li>
                    <a>Sidebar Item 1</a>
                </li>
                <li>
                    <a>Sidebar Item 2</a>
                </li>
            </ul>
        </div>
    );
};

