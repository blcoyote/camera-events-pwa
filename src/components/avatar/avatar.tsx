interface AvatarProps {
    src?: string;
    alt: string;
}

export const Avatar = (props: AvatarProps) => {
    const { src, alt } = props;
    return (
        <div className="avatar">
            <div className="w-10 rounded-full drop-shadow-lg">
                <img src={src} alt={alt} />
            </div>
        </div>
    );
};
