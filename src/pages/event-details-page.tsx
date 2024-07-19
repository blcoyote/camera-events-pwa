import {
    isRouteErrorResponse,
    useParams,
    useRouteError,
    useNavigate,
} from "react-router-dom";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useEventDetails, useEventSnapshot } from "../hooks/use-event";
import { EventContainer } from "../components/event-card/event-card";
import { motion } from "framer-motion";

export const Component = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const canGoBack = History.length > 1;

    const navigateToEventsPage = () => {
        if (canGoBack) {
            navigate(-1);
        } else {
            navigate("/events/");
        }
    };
    const { loading, error, data, isSuccess } = useEventDetails(id);
    const { loading: snapshotLoading, data: snapshotData } =
        useEventSnapshot(id);

    return (
        <div className="flex content-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="btn btn-circle relative top-12">
                    <IconArrowBackUp
                        onClick={navigateToEventsPage}
                        className="text-secondary"
                    />
                </div>
                <EventContainer
                    event={data}
                    isLoading={loading}
                    isError={error !== null}
                    isSuccess={isSuccess}
                    isSnapshotLoading={snapshotLoading}
                    snapshotData={snapshotData}
                    refetch={() => {}}
                />
            </motion.div>
        </div>
    );
};

Component.displayName = "EventDetailsLazyRoute";

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

ErrorBoundary.displayName = "EventDetailsErrorBoundary";

