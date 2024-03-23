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

export default function App() {
	const queryClient = new QueryClient();
	const store = createStore();
	const colorScheme = useColorScheme();
		const [fcmToken, setTokenFound] = useState<string | undefined>(undefined);
	const [show, setShow] = useState(false);
	const [notification, setNotification] = useState({ title: "", body: "" });

	useEffect(() => {
		getMessageToken(setTokenFound);
	}, []);

	console.log(show, notification);
	onMessageListener()
		.then((payload) => {
			if (payload.notification?.title && payload.notification?.body) {
				setShow(true);
				setNotification({
					title: payload.notification?.title,
					body: payload.notification?.body,
				});
				console.log(payload);
			}
		})
		.catch((err) => console.log("failed: ", err));

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
					</FirebaseNotificationProvider>
				</QueryClientProvider>
			</MantineProvider>
		</JotaiProvider>
	);
}
