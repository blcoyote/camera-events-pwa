import type { CameraEvent } from "../../models/camera-event.model";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { HiFilm, HiPhoto } from "react-icons/hi2";
import { CameraNames } from "../../config/enum-camera-names";

interface EventContainerProps {
    event?: CameraEvent;
    isError: boolean;
    snapshotData?: string;
}

export const EventContainer = (props: EventContainerProps) => {
    const { event, isError, snapshotData } = props;
    const image = snapshotData && `data:image/jpeg;base64,${snapshotData}`;

    if (isError) {
        return <div>Error...</div>;
    }

    return (
        <div className="card-normal bg-base-100 max-w-xl max-h-dvh rounded-box shadow-xl ">
            <figure>
                <img src={image} alt="survellance" className="rounded-t-box" />
            </figure>
            <div className="card-body relative">
                <div className="badge badge-secondary absolute top-2 right-2">
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
                <p>{`Probability: ${
                    event && (event?.data.score * 100).toFixed(2)
                }%`}</p>
                <p>{`EventId: ${event?.id}`}</p>
                <div className="divider" />
                <div className="flex justify-evenly ">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        title="Download Snapshot"
                    >
                        <a
                            href={`${
                                import.meta.env.VITE_BaseURL
                            }/api/v2/downloads/${
                                event?.id
                            }/snapshot.jpg?token=${sessionStorage.getItem(
                                "fbtoken"
                            )}`}
                        >
                            <HiPhoto
                                size={32}
                                className="cursor-pointer text-secondary"
                            />
                        </a>
                    </motion.button>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        title=""
                    >
                        <a
                            href={`${
                                import.meta.env.VITE_BaseURL
                            }/api/v2/downloads/${
                                event?.id
                            }/clip.mp4?token=${sessionStorage.getItem(
                                "fbtoken"
                            )}`}
                        >
                            <HiFilm
                                size={32}
                                className="cursor-pointer text-secondary"
                            />
                        </a>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

