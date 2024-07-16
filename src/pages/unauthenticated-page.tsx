export const UnauthenticatedPage = ({ error }: { error: string | undefined }) => {
    return (
        <div>
            <h1>Please log in</h1>
            <p>{error ? error : ""}</p>
        </div>
    );
};
