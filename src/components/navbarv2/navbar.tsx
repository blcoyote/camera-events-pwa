import { useAuthProvider } from "../../hooks/use-auth-provider";
import { Avatar } from "../avatar/avatar";
import { NavbarMenu } from "./navbar-menu";

export const Navbar = () => {
    const { user, loading, signInWithGoogle, handleLogout } = useAuthProvider();
    return (
        <div className="sticky top-3 z-20">
            <div className="navbar bg-base-100 shadow-xl rounded-box">
                <div className="navbar-start">
                    {user && <NavbarMenu handleLogout={handleLogout} />}
                </div>
                <div className="navbar-center">
                    <a href={"/"} className="btn btn-ghost text-xl">
                        Camera Events
                    </a>
                </div>
                <div className="navbar-end">
                    {!user && (
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={signInWithGoogle}
                        >
                            Login
                        </button>
                    )}
                    {user && <Avatar user={user} />}
                </div>
            </div>
        </div>
    );
};

