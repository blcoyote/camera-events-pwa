import {
    isRouteErrorResponse,
    useParams,
    useRouteError,
    useNavigate,
} from "react-router-dom";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useEventSnapshot } from "../hooks/use-event";
import { EventContainer } from "../components/event-card/event-card";
import { motion } from "framer-motion";
import { useGetCameraEventDetailsQuery } from "../services/camera-api";

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

    // const {
    //     data: eventData,
    //     isSuccess,
    //     loading: isLoading,
    //     error: isError,
    // } = useEventDetails(id);

    const {
        data: eventData,
        isSuccess,
        isLoading,
        isError,
    } = useGetCameraEventDetailsQuery(id ?? "", { skip: !id });

    const { loading: snapshotLoading, data: snapshotData } =
        useEventSnapshot(id);

    return (
        <div className="flex content-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <button
                    className="btn btn-circle relative top-12"
                    onClick={navigateToEventsPage}
                >
                    <IconArrowBackUp className="text-secondary" />
                </button>
                {eventData && (
                    <EventContainer
                        event={eventData}
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                        isSnapshotLoading={snapshotLoading}
                        snapshotData={snapshotData}
                        refetch={() => {}}
                    />
                )}
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

