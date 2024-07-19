import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useGetCameraEventsQuery } from "../services/camera-api";

export const Component = () => {
    const { data, isLoading, error } = useGetCameraEventsQuery(10);
    return (
        <div>
            <h1>test</h1>
            {data?.map((event) => <div key={event.id}>{event.camera}</div>)}
            <p>{isLoading === true ? "loading" : "not loading"}</p>
            <p>{error ? "error!" : "no error"}</p>
        </div>
    );
};

Component.displayName = "TestPageLazyRoute";

export function ErrorBoundary() {
    const error = useRouteError();
    return isRouteErrorResponse(error) ? (
        <h1>
            {error.status} {error.statusText}
        </h1>
    ) : (
        <h1>{error?.toString()}</h1>
    );
}

ErrorBoundary.displayName = "TestPageErrorBoundary";

