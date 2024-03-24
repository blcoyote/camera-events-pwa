import { useAuthProvider } from "./hooks/use-auth-provider";
import { useApi } from "./hooks/use-api.tsx";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const FirebaseNotificationProvider = (props: {
	fcmToken?: string;
	children: React.ReactNode;
}) => {
	const { token } = useAuthProvider();
	const { api } = useApi();

	const { mutate } = useMutation({
		mutationFn: () =>
			api.post(`/v2/fcm?fcm_token=${props.fcmToken}&token=${token}`),
	});

	useEffect(() => {
		if (props.fcmToken && token) {
			mutate();
		}
	}, [props.fcmToken, mutate, token]);

	return props.children;
};