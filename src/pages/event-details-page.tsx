import {
    isRouteErrorResponse,
    useParams,
    useRouteError,
    useNavigate,
} from "react-router-dom";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useEventDetails, useEventSnapshot } from "../hooks/use-event";
import { EventContainer } from "../components/event-card/event-cardv2";
import { motion } from "framer-motion";

export const Component = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const navigateToEventsPage = () => {
        navigate("/events/");
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
                style={{ marginTop: "0.5rem" }}
            >
                <div className="hover:bg-stone-300 rounded-box w-6">
                    <IconArrowBackUp
                        onClick={navigateToEventsPage}
                        className="my-4 cursor-pointer text-secondary"
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

