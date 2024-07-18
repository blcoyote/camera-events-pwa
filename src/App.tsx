import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { Provider as JotaiProvider, createStore } from "jotai";
import { router } from "./router/routes";
import { lightTheme, darkTheme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "@mantine/hooks";
import { FirebaseNotificationProvider } from "./FirebaseNotificationProvider";
import { useEffect, useState } from "react";
import { getMessageToken, onMessageListener } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
    const queryClient = new QueryClient();
    const store = createStore();
    const colorScheme = useColorScheme();
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
            <MantineProvider
                defaultColorScheme="light"
                theme={colorScheme === "dark" ? darkTheme : lightTheme}
            >
                <QueryClientProvider client={queryClient}>
                    <FirebaseNotificationProvider fcmToken={fcmToken}>
                        <RouterProvider
                            router={router}
                            future={{ v7_startTransition: true }}
                        />
                        <ToastContainer />
                    </FirebaseNotificationProvider>
                </QueryClientProvider>
            </MantineProvider>
        </JotaiProvider>
    );
}

