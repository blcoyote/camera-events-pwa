import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../config/service";
import { useAuthProvider } from "./use-auth-provider";
import type { CameraEvent } from "../models/camera-event.model";
import useSettings from "./use-settings";

export const useEventList = () => {
	const { token } = useAuthProvider();
	const { eventLimit } = useSettings();

	const params = { limit: eventLimit };

	const {
		isPending,
		error,
		data,
		isFetching,
		isLoading,
		isRefetching,
		isSuccess,
	} = useQuery({
		queryKey: ["eventList"],
		enabled: !!token,
		queryFn: () =>
			axios
				.get(`${ import.meta.env.MODE === 'development' ? '' : import.meta.env.VITE_BaseURL}/v2/events`, {
					headers: {
						"X-token": token,
						"Content-Type": "application/json;charset=UTF-8",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods":
							"DELETE, POST, GET, OPTIONS, REDIRECT",
						"Access-Control-Allow-Headers":
							"Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
					},
					params: params,
				})
				.then((res) => res.data as CameraEvent[]),
	});

	const loading = isFetching || isLoading || isPending || isRefetching;
	return { loading, error, data, isSuccess };
};
