import { useMutation, useQuery } from "@tanstack/react-query";
import { useApi } from "./use-api.tsx";
import fileDownload from "js-file-download";

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
                .get(`/v2/events/${id}/snapshot.jpg`, {
                    responseType: "arraybuffer",
                })
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

export const useEventClipDownload = (id?: string) => {
    const { api } = useApi();
    const { isPending, error, isSuccess, mutate } = useMutation({
        mutationFn: () =>
            api
                .get(`/v2/events/${id}/clip.mp4`, {
                    responseType: "arraybuffer",
                })
                .then((res) => {
                    fileDownload(res.data, `${id}.mp4`);
                }),
    });

    return { loading: isPending, error, isSuccess, download: mutate };
};

export const useEventSnapshotDownload = (id?: string) => {
    const { api } = useApi();
    const { isPending, error, isSuccess, mutate } = useMutation({
        mutationFn: () =>
            api
                .get(`/v2/events/${id}/snapshot.jpg`, {
                    responseType: "arraybuffer",
                })
                .then((res) => {
                    fileDownload(res.data, `${id}.jpg`);
                }),
    });

    return { loading: isPending, error, isSuccess, download: mutate };
};

