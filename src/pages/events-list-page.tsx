import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useEventList } from "../hooks/use-event-list";
import { EventListCard } from "../components/event-list-card";
import { EventListCardLoader } from "../components/event-list-card/event-list-card-loader";

export const Component = () => {
    const { data, loading } = useEventList();

    return (
        <div className="grid content-center pt-5 lg:grid-cols-2 gap-4 w-max-dvw">
            {loading &&
                [1, 2, 3].map((key) => <EventListCardLoader key={key} />)}
            {!loading &&
                data?.map((event) => (
                    <EventListCard
                        key={event.id}
                        {...event}
                        isLoading={loading}
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

