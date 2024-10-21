import { useSignInWithGoogle, useIdToken } from "react-firebase-hooks/auth";
import { Avatar } from "../avatar/avatar";
import { auth } from "../../config/firebase";
import { MenuDrawerButton } from "../menu-drawer/menu-drawer-button";

export const Navbar = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [user, loading] = useIdToken(auth);

    const signIn = async () => {
        await signInWithGoogle();
    };

    return (
        <div className="sticky top-3 z-10">
            <div className="navbar bg-base-100 shadow-xl rounded-box">
                <div className="navbar-start">
                    {user && <MenuDrawerButton />}
                </div>
                <div className="navbar-center">
                    <a href={"/"} className="btn btn-ghost text-xl">
                        Camera Events
                    </a>
                </div>
                <div className="navbar-end">
                    {!user && !loading && (
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={signIn}
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

