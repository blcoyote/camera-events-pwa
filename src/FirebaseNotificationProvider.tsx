import { useApi } from "./hooks/use-api.tsx";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const FirebaseNotificationProvider = (props: {
    fcmToken?: string;
    children: React.ReactNode;
}) => {
    const { api } = useApi();
    const token = sessionStorage.getItem("fbtoken");

    const { mutate } = useMutation({
        mutationFn: () =>
            api.get(`/v2/fcm?fcm_token=${props.fcmToken}&token=${token}`),
    });

    useEffect(() => {
        if (props.fcmToken && token) {
            mutate();
        }
    }, [props.fcmToken, mutate, token]);

    return props.children;
};

