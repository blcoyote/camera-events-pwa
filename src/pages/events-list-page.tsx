import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useEventList } from "../hooks/use-event-list";
import { EventListCard } from "../components/event-list-card";
import { Flex, Title } from "@mantine/core";

export const Component = () => {
	const { data } = useEventList();

	return (
		<Flex justify="space-between" gap={"1rem"} direction={"column"}>
			<Title size={"h3"} c={"dimmed"}>
				Camera events
			</Title>
			{data?.map((event) => (
				<EventListCard key={event.id} {...event} />
			))}
		</Flex>
	);
};

Component.displayName = "EventListLazyRoute";

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

ErrorBoundary.displayName = "EventListErrorBoundary";
