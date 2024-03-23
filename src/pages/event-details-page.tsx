import {
	isRouteErrorResponse,
	useParams,
	useRouteError,
	useNavigate,
} from "react-router-dom";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useEventDetails, useEventSnapshot } from "../hooks/use-event";
import { Flex, Image } from "@mantine/core";
import { EventContainer } from "../components/event-card/event-card";

export const Component = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const navigateToEventsPage = () => {
		navigate("/events/");
	};
	const { loading, error, data, isSuccess } = useEventDetails(id);
	const {
		loading: snapshotLoading,
		error: snapshotError,
		data: snapshotData,
	} = useEventSnapshot(id);

	const image = snapshotData && `data:image/jpeg;base64,${snapshotData}`;
	const fallbackImage = "https://placehold.co/600x400?text=error";

	return (
		<div>
			<IconArrowBackUp onClick={navigateToEventsPage} color="#797979" />
			<EventContainer
				event={data}
				isLoading={loading}
				isError={error !== null}
				isSuccess={isSuccess}
				isSnapshotLoading={snapshotLoading}
				snapshotData={snapshotData}
				refetch={() => {}}
			/>
		</div>
	);
};

Component.displayName = "EventDetailsLazyRoute";

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

ErrorBoundary.displayName = "EventDetailsErrorBoundary";
