import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../config/service";
import { useAuthProvider } from "./use-auth-provider";
import { useState } from "react";
import type { CameraEvent } from "../models/camera-event.model";

export const useEvent = (id: string) => {
	const { user } = useAuthProvider();
	const [token, setToken] = useState<string | null>(null);
	user?.getIdToken().then((token) => {
		setToken(token);
	});
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ["eventList"],
		enabled: !!token,
		queryFn: () =>
			axios
				.get(`${baseUrl}/v2/event/${id}`, { headers: { "X-token": token } })
				.then((res) => res.data as CameraEvent),
	});
	return { isPending, error, data, isFetching };
};
