import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const Component = () => {
	return (
		<div>
			<h1>There really is nothing at:</h1>
			<h2>{window.location.href}</h2>
		</div>
	);
};

Component.displayName = "404PageLazyRoute";

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

ErrorBoundary.displayName = "404PageErrorBoundary";
