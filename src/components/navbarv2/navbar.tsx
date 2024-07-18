import { NavbarContent } from "./navbar-content";
import { NavbarHamburger } from "./navbar-hamburger";
import { NavbarTitle } from "./navbar-title";

export const Navbar = () => {
    return (
        <div className="navbar bg-base-300 w-full">
            <NavbarHamburger />
            <NavbarTitle />
            <div className="hidden flex-none lg:block">
                <NavbarContent />
            </div>
        </div>
    );
};

