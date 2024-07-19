import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { EventListCard } from "../components/event-list-card";
import { EventListCardLoader } from "../components/event-list-card/event-list-card-loader";
import { useGetCameraEventsQuery } from "../services/camera-api";
//import { useEventList } from "../hooks/use-events-list";

export const Component = () => {
    const { data, isLoading } = useGetCameraEventsQuery(10);
    //const { data, loading: isLoading } = useEventList();

    return (
        <div className="grid content-center pt-5 lg:grid-cols-2 gap-4 w-max-dvw">
            {isLoading &&
                [1, 2, 3].map((key) => <EventListCardLoader key={key} />)}
            {!isLoading &&
                data?.map((event) => (
                    <EventListCard
                        key={event.id}
                        {...event}
                        isLoading={isLoading}
                    />
                ))}
        </div>
    );
};

Component.displayName = "EventListLazyRoute";

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

ErrorBoundary.displayName = "EventListErrorBoundary";

