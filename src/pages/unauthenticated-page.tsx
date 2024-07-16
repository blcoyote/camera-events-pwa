export const UnauthenticatedPage = ({
    error,
}: {
    error: Error | undefined;
}) => {
    return (
        <div>
            <h1>Please log in</h1>
            <p>{error ? error.name : ""}</p>
            <p>{error ? error.message : ""}</p>
        </div>
    );
};
