import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useEventList } from "../hooks/use-event-list";
import { EventListCard } from "../components/event-list-card";
import { Flex, Title } from "@mantine/core";
import { EventListCardLoader } from "../components/event-list-card/event-list-card-loader";

export const Component = () => {
	const { data, loading } = useEventList();
	const { data, loading } = useEventList();

	return (
        <Flex
            justify="space-between"
            gap={"1rem"}
            direction={"column"}
            px={{ base: "1rem", sm: "2rem" }}
            style={{
                marginTop: "0.5rem",
            }}
        >
            <Title size={"h3"} c={"dimmed"}>
                Camera events
            </Title>
            {loading &&
                [1, 2, 3].map((key) => <EventListCardLoader key={key} />)}
            {!loading &&
                data?.map((event) => (
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
