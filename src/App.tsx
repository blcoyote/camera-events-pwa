import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { Provider as JotaiProvider, createStore } from "jotai";
import { router } from "./router/routes";
import { lightTheme, darkTheme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "@mantine/hooks";

export default function App() {
	const queryClient = new QueryClient();
	const store = createStore();
	const colorScheme = useColorScheme();


	return (
		<JotaiProvider store={store}>
			<MantineProvider
				defaultColorScheme="light"
				theme={colorScheme === "dark" ? darkTheme : lightTheme}
			>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router}   future={{ v7_startTransition: true }}/>
				</QueryClientProvider>
			</MantineProvider>
		</JotaiProvider>
	);
}


