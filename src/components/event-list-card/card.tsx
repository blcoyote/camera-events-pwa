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
                <img src={image} alt="Thumbnail" className="h-fit scale-150" />
            </figure>
            <div className="absolute right-2 top-2 badge badge-accent">
                {CameraNames[props.camera as keyof typeof CameraNames] ??
                    "Unknown"}
            </div>
            <div className="card-body ">
                <h2 className="card-title text-sm md:text-lg">
                    {timestamp.format("DD/MM/YYYY HH:mm")}
                </h2>
                <p>{`Label: ${props.label}`}</p>
                <p>{`Probability: ${(props.data.score * 100).toFixed(2)}%`}</p>
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
            <div className="absolute right-5 top-5 badge badge-accent"></div>
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

