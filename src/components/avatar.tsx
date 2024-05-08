export const Avatar = (props: { src?: string; alt: string }) => {
    return (
        <div className="avatar">
            <div className="w-10 rounded-full drop-shadow-lg">
                <img src={props.src} alt={props.alt} />
            </div>
        </div>
    );
};
