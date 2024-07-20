import { RouterProvider } from "react-router-dom";
import { Provider as JotaiProvider, createStore } from "jotai";
import { router } from "./router/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FirebaseNotificationProvider } from "./FirebaseNotificationProvider";
import { useEffect, useState } from "react";
import { auth, getMessageToken, onMessageListener } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIdToken } from "react-firebase-hooks/auth";
import { useAppDispatch } from "./state/hooks";
import { setToken } from "./state/auth-slice";

export const App = () => {
    const [queryClient] = useState(() => new QueryClient());
    const dispatch = useAppDispatch();
    const store = createStore();
    const [fcmToken, setFcmToken] = useState<string | undefined>(undefined);
    const [user] = useIdToken(auth);
    user?.getIdToken().then((token) => {
        dispatch(setToken(token));
        sessionStorage.setItem("fbtoken", token);
    });

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
};

export default App;

