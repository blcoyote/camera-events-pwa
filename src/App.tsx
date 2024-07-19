import { RouterProvider } from "react-router-dom";
import { Provider as JotaiProvider, createStore } from "jotai";
import { router } from "./router/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FirebaseNotificationProvider } from "./FirebaseNotificationProvider";
import { useEffect, useState } from "react";
import { getMessageToken, onMessageListener } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    const [queryClient] = useState(() => new QueryClient());

    const store = createStore();

    const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        getMessageToken(setFcmToken);
    }, []);

    onMessageListener().then((payload) => {
        console.log("payload", payload);
        function ToastDisplay() {
            return (
                <div>
                    <p>
                        <b>{payload.notification?.title}</b>
                    </p>
                    <p>{payload.notification?.body}</p>
                </div>
            );
        }
        if (payload.notification?.title && payload.notification?.body) {
            toast.info(<ToastDisplay />);
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
}

