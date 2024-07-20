import { User } from "firebase/auth";

interface AvatarProps {
    user: User;
}

export const Avatar = (props: AvatarProps) => {
    const { user } = props;
    return (
        <div className="avatar drop-shadow-lg">
            <div className="w-12 rounded-full">
                <img src={user.photoURL ?? undefined} alt="avatar icon" />
            </div>
        </div>
    );
};

