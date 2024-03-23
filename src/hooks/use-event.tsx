import { useQuery } from "@tanstack/react-query";
import type { CameraEvent } from "../models/camera-event.model";
import { useApi } from "./use-api.tsx";

export const useEventDetails = (id?: string, skip?: boolean) => {
	const { api, hasToken } = useApi();
	const {
		isPending,
		error,
		data,
		isFetching,
		isLoading,
		isRefetching,
		isSuccess,
	} = useQuery({
		queryKey: ["eventDetails"],
		enabled: hasToken && !skip,

		queryFn: () =>
			api.get(`/v2/events/${id}`, {}).then((res) => res.data as CameraEvent),
	});

	const loading = isFetching || isLoading || isPending || isRefetching;
	return { loading, error, data, isSuccess };
};

export const useEventSnapshot = (
	id?: string,
	skip?: OnBeforeUnloadEventHandlerNonNull,
) => {
	const { api, hasToken } = useApi();
	const {
		isPending,
		error,
		data,
		isFetching,
		isLoading,
		isRefetching,
		isSuccess,
	} = useQuery({
		queryKey: ["eventSnapshot"],
		enabled: hasToken && !skip,

		queryFn: () =>
			api
				.get(`/v2/events/${id}/snapshot.jpg`, { responseType: "arraybuffer" })
				.then((res) => {
					const base64 = btoa(
						new Uint8Array(res.data).reduce(
							(data, byte) => data + String.fromCharCode(byte),
							"",
						),
					);
					return base64;
				}),
	});

	const loading = isFetching || isLoading || isPending || isRefetching;
	return { loading, error, data, isSuccess };
};