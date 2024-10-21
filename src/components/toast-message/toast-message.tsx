import { MessagePayload } from "firebase/messaging";

export const ToastMessage = (props: { payload: MessagePayload }) => {
    return (
        <div>
            <p>
                <b>{props.payload.notification?.title}</b>
            </p>
            <p>{props.payload.notification?.body}</p>
        </div>
    );
};

