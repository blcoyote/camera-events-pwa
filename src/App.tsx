import { RouterProvider } from "react-router-dom";
import { Provider as JotaiProvider, createStore } from "jotai";
import { router } from "./router/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FirebaseNotificationProvider } from "./FirebaseNotificationProvider";
import { useEffect, useState } from "react";
import { auth, getMessageToken, onMessageListener } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useIdToken } from "react-firebase-hooks/auth";
import { useAppDispatch } from "./state/hooks";
import { setToken } from "./state/auth-slice";
import { ToastMessage } from "./components/toast-message/toast-message";
import "react-toastify/dist/ReactToastify.css";
import { cameraApi } from "./services/camera-api";
import { useNotifications } from "./hooks/use-notifications";

export const App = () => {
    const [queryClient] = useState(() => new QueryClient());
    const dispatch = useAppDispatch();
    const store = createStore();
    const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);
    const [user] = useIdToken(auth);
    const { loadNotificationSettings } = useNotifications();

    user?.getIdToken().then((token) => {
        dispatch(setToken(token));
        sessionStorage.setItem("fbtoken", token);
    });

    useEffect(() => {
        loadNotificationSettings();
        getMessageToken(setFcmToken);
    }, []);

    useEffect(() => {
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                cameraApi.util.invalidateTags(["CameraEvents"]);
            }
        });
    }, []);

    onMessageListener().then((payload) => {
        console.log("payload", payload);
        if (
            payload.notification?.title &&
            payload.notification?.body &&
            localStorage.getItem("notification-enabled") === "true"
        ) {
            toast.info(<ToastMessage payload={payload} />);
        }
    });

    return (
        <JotaiProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <FirebaseNotificationProvider fcmToken={fcmToken}>
                    <RouterProvider
                        router={router}
                        future={{ v7_startTransition: true }}
                    />
                    <ToastContainer />
                </FirebaseNotificationProvider>
            </QueryClientProvider>
        </JotaiProvider>
    );
};

export default App;

