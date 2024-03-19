import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const Component = () => {
	return (
		<div>
			<h1>anout</h1>
		</div>
	);
};

Component.displayName = "AboutPageLazyRoute";

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

ErrorBoundary.displayName = "AboutPageErrorBoundary";
