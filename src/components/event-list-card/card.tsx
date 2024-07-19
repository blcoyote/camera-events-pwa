import { useNavigate } from "react-router-dom";
import { CameraEvent } from "../../models/camera-event.model";
import dayjs from "dayjs";
import { CameraNames } from "../../config/enum-camera-names";

export const Card = (props: CameraEvent) => {
    const navigate = useNavigate();
    const timestamp = dayjs.unix(props.start_time);
    const image = `data:image/jpeg;base64,${props.thumbnail}`;
    const navigateToEvent = () => {
        navigate(`/event/${props.id}`);
    };

    return (
        <div
            tabIndex={0}
            className="card card-side bg-base-100 shadow-xl cursor-pointer "
            onClick={navigateToEvent}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    navigateToEvent();
                }
            }}
        >
            <figure>
                <img src={image} alt="Thumbnail" className="scale-110" />
            </figure>
            <div className="absolute right-4 top-4 badge badge-accent">
                {CameraNames[props.camera as keyof typeof CameraNames] ??
                    "Unknown"}
            </div>
            <div className="card-body pt-4">
                <h2 className="card-title">
                    {timestamp.format("DD/MM/YYYY HH:mm:ss")}
                </h2>

                <p>{`Label: ${props.label}`}</p>

                <p>{`Probability: ${(props.data.score * 100).toFixed(2)}%`}</p>

                <p>{`EventId: ${props.id}`}</p>
            </div>
        </div>
    );
};

export const CardLoader = () => {
    const image = "https://placehold.co/600x400?text=loading";

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure>
                <img src={image} alt="Thumbnail" className="w-44 h-44" />
            </figure>
            <div className="absolute right-5 top-5 badge badge-accent">
                Loading
            </div>
            <div className="card-body pt-4 gap-3">
                <h2 className="card-title">
                    <div className="skeleton h-7 w-4/6"></div>
                </h2>

                <div className="p skeleton h-5 w-1/6"></div>

                <div className="skeleton h-5 w-2/6"></div>

                <div className="skeleton h-5 w-3/6"></div>
            </div>
        </div>
    );
};

