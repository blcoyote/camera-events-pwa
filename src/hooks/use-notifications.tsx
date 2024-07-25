import { useEffect, useState } from "react";

export const useNotifications = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const channel4Broadcast = new BroadcastChannel("channel4");

    useEffect(() => {
        const notificationsEnabled = localStorage.getItem(
            "notifications-enabled",
        );
        if (notificationsEnabled === "true") {
            enableNotifications(true);
        }
    }, []);

    const loadNotificationSettings = () => {
        const notificationsEnabled = localStorage.getItem(
            "notifications-enabled",
        );

        if (notificationsEnabled === null) {
            enableNotifications(false);
            return;
        }

        if (notificationsEnabled === "true") {
            enableNotifications(true);
        }
    };

    const enableNotifications = (enable: boolean) => {
        setNotificationsEnabled(enable);
        if (enable) {
            channel4Broadcast.postMessage({ notifications: true });
            localStorage.setItem("notifications-enabled", "true");
        } else {
            channel4Broadcast.postMessage({ notifications: false });
            localStorage.setItem("notifications-enabled", "false");
        }
    };

    return {
        notificationsEnabled,
        enableNotifications,
        loadNotificationSettings,
    };
};

