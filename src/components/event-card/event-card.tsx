import type { CameraEvent } from "../../models/camera-event.model";
import { IconMovie, IconPhoto } from "@tabler/icons-react";
import { motion } from "framer-motion";
import dayjs from "dayjs";

import { CameraNames } from "../../config/enum-camera-names";
import { auth } from "../../config/firebase";
import { useIdToken } from "react-firebase-hooks/auth";

interface EventContainerProps {
    event?: CameraEvent;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    snapshotData?: string;
    isSnapshotLoading: boolean;
    refetch?: () => void;
}

export const EventContainer = (props: EventContainerProps) => {
    const { event, isError, snapshotData } = props;
    const image = snapshotData && `data:image/jpeg;base64,${snapshotData}`;

    const [user] = useIdToken(auth);

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <div className="card-normal bg-base-100 max-w-xl max-h-dvh rounded-box shadow-xl ">
            <figure>
                <img src={image} alt="survellance" className="rounded-t-box" />
            </figure>
            <div className="card-body relative">
                <div className="badge badge-accent absolute top-2 right-2">
                    {CameraNames[event?.camera as keyof typeof CameraNames] ??
                        "Unknown"}
                </div>
                <h2 className="card-title">
                    {event &&
                        dayjs
                            .unix(event?.start_time)
                            .format("DD MMM. YYYY HH:mm:ss")}
                </h2>
                <p>{`Label: ${event?.label}`}</p>
                <p>{`Probability: ${event && (event?.data.score * 100).toFixed(2)}%`}</p>
                <p>{`EventId: ${event?.id}`}</p>
                <div className="divider" />
                <div className="flex justify-evenly ">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <a
                            href={`${
                                import.meta.env.VITE_BaseURL
                            }/api/v2/downloads/${
                                event?.id
                            }/snapshot.jpg?token=${user?.getIdToken()}`}
                        >
                            <IconPhoto
                                size={40}
                                className="cursor-pointer text-secondary"
                            />
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <a
                            href={`${
                                import.meta.env.VITE_BaseURL
                            }/api/v2/downloads/${
                                event?.id
                            }/clip.mp4?token=${user?.getIdToken()}`}
                        >
                            <IconMovie
                                size={40}
                                className="cursor-pointer text-secondary"
                            />
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

