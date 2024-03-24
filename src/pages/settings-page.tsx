import { Box, Paper, Slider, Text } from "@mantine/core";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { useState } from "react";
import useSettings from "../hooks/use-settings";

export const Component = () => {
	const { eventLimit, setEventLimit } = useSettings();
	const [value, setValue] = useState(eventLimit);
	const minValue = 0;
	const maxValue = 100;
	return (
		<Paper shadow="xs" p="xl">
			<Box maw={400} mx="auto">
				<Text>Maximum displayed events:</Text>
				<Slider
					min={minValue}
					max={maxValue}
					value={value}
					onChange={setValue}
					onChangeEnd={setEventLimit}
					marks={[
						{ value: 0, label: minValue },
						{ value: 100, label: maxValue },
					]}
				/>
			</Box>
		</Paper>
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
