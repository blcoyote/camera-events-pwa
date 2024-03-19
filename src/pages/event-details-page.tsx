import {
	isRouteErrorResponse,
	useParams,
	useRouteError,
} from "react-router-dom";

export const Component = () => {
	const { id } = useParams();

	return (
		<div>
			<h1>{`event ${id}`}</h1>
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
