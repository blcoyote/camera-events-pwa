import { useQuery } from "@tanstack/react-query";
import type { CameraEvent } from "../models/camera-event.model";
import useSettings from "./use-settings";
import { useApi } from "./use-api.tsx";

export const useEventList = () => {
    const { api, hasToken } = useApi();
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
        enabled: hasToken,
        queryFn: () =>
            api
                .get("/v2/events/", {
                    params: params,
                })
                .then((res) => res.data as CameraEvent[]),
    });

    const loading = isFetching || isLoading || isPending || isRefetching;
    return { loading, error, data, isSuccess };
};

