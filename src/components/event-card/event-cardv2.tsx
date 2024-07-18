import type { CameraEvent } from "../../models/camera-event.model";
import { IconMovie, IconPhoto } from "@tabler/icons-react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useAuthProvider } from "../../hooks/use-auth-provider";
import { CameraNames } from "../../config/enum-camera-names";

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
    const { event, isLoading, isError, isSnapshotLoading, snapshotData } =
        props;
    const image = snapshotData && `data:image/jpeg;base64,${snapshotData}`;
    const fallbackImage = "https://placehold.co/600x400?text=error";
    const { token } = useAuthProvider();

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <div className="card-normal bg-base-100 w-96 rounded-box shadow-xl ">
            <figure>
                <img src={image} alt="car!" className="rounded-t-box" />
            </figure>
            <div className="card-body">
                <div className="badge badge-accent">
                    {CameraNames[event?.camera as keyof typeof CameraNames] ??
                        "Unknown"}
                </div>
                <div className="card-body pt-4">
                    <h2 className="card-title">
                        {event &&
                            dayjs
                                .unix(event?.start_time)
                                .format("DD MMM. YYYY HH:mm:ss")}
                    </h2>

                    <p>{`Label: ${event?.label}`}</p>

                    <p>{`Probability: ${event && (event?.data.score * 100).toFixed(2)}%`}</p>

                    <p>{`EventId: ${event?.id}`}</p>
                </div>
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
                            }/snapshot.jpg?token=${token}`}
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
                            }/clip.mp4?token=${token}`}
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

