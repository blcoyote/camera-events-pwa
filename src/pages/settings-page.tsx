import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { SyntheticEvent, useEffect, useState } from "react";
import useSettings from "../hooks/use-settings";

import { useApi } from "../hooks/use-api.tsx";
import { useMutation } from "@tanstack/react-query";
import { auth, getMessageToken } from "../config/firebase.ts";
import { iOS } from "../lib/devices.ts";
import { useIdToken } from "react-firebase-hooks/auth";

export const Component = () => {
    const { eventLimit, setEventLimit } = useSettings();
    const [value, setValue] = useState(eventLimit);
    const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);
    const minValue = 0;
    const maxValue = 100;
    const [user] = useIdToken(auth);
    const { api } = useApi();

    const isInstalled = window.matchMedia("(display-mode: standalone)").matches;
    const showNotifications = isInstalled || !iOS();

    const notificationButtonTitle =
        showNotifications && Notification.permission === "granted"
            ? "Enabled"
            : "Enable";

    const { mutate } = useMutation({
        mutationFn: () =>
            api.get(
                `/v2/fcm?fcm_token=${fcmToken}&token=${user?.getIdToken()}`,
            ),
    });

    useEffect(() => {
        if (fcmToken && user?.getIdToken()) {
            mutate();
        }
    }, [fcmToken, mutate, user?.getIdToken()]);

    const handleMaxEventsChange = (event: SyntheticEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    useEffect(() => {
        setEventLimit(value);
        console.log(value);
    }, [value]);

    const toggleNotifications = () => {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                getMessageToken(setFcmToken);
            }
        });
    };

    return (
        <div className="bg-base-100 drop-shadow-sm p-5 rounded-box">
            <div className="flex gap-5 flex-col justify-items-center">
                <div className="flex flex-col gap-2">
                    <h2>Maximum displayed events:</h2>

                    <input
                        type="range"
                        min={minValue}
                        max={maxValue}
                        value={value}
                        className="range range-primary"
                        step="25"
                        onChange={handleMaxEventsChange}
                    />
                    <div className="flex w-full justify-between px-2 text-xs">
                        <span>0</span>
                        <span className="ml-1">25</span>
                        <span>50</span>
                        <span className="-mr-1">75</span>
                        <span className="-mr-2">100</span>
                    </div>
                </div>
                {showNotifications && (
                    <div className="flex flex-col gap-2">
                        <h2>Notifications:</h2>
                        <button
                            className="btn btn-primary"
                            onClick={toggleNotifications}
                        >
                            {notificationButtonTitle}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

Component.displayName = "SettingsPageLazyRoute";

export function ErrorBoundary() {
    const error = useRouteError();
    return isRouteErrorResponse(error) ? (
        <h1>
            {error.status} {error.statusText}
        </h1>
    ) : (
        <h1>{error?.toString()}</h1>
    );
}

ErrorBoundary.displayName = "SettingsErrorBoundary";

