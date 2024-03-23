import {
	Card,
	Flex,
	Image,
	Skeleton,
	Title,
	Text,
	Divider,
} from "@mantine/core";
import type { CameraEvent } from "../../models/camera-event.model";

interface EventContainerProps {
	event?: CameraEvent;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	snapshotData?: string;
	isSnapshotLoading: boolean;
	refetch: () => void;
}

export const EventContainer = (props: EventContainerProps) => {
	const {
		event,
		isLoading,
		isError,
		isSnapshotLoading,
		snapshotData,
		refetch,
	} = props;
	const image = snapshotData && `data:image/jpeg;base64,${snapshotData}`;
	const fallbackImage = "https://placehold.co/600x400?text=error";

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error...</div>;
	}

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Card.Section>
				<Skeleton visible={isSnapshotLoading} mb={"1rem"}>
					<Image src={image} fallbackSrc={fallbackImage} />
				</Skeleton>
			</Card.Section>
			<Skeleton visible={isLoading}>
				<Title size={"md"} hiddenFrom="sm">{`EventId ${event?.id}`}</Title>
				<Title visibleFrom="sm">{`EventId: ${event?.id}`}</Title>
			</Skeleton>
			<Flex
				gap={"1rem"}
				direction={"column"}
				m={"1rem"}
				style={{
					borderWidth: "1px",
					borderStyle: "solid",
					borderColor: "#e0e0e0",
					borderRadius: "0.5rem",
				}}
			>
				<Flex gap={"1rem"} direction={"row"} mx={"1rem"}>
					<Text style={{ fontWeight: "bold" }}>Timestamp: </Text>
					<Skeleton visible={isLoading}>
						<Text>{event?.start_time}</Text>
					</Skeleton>
				</Flex>
				<Flex gap={"1rem"} direction={"row"} mx={"1rem"}>
					<Text style={{ fontWeight: "bold" }}>Label: </Text>
					<Skeleton visible={isLoading}>
						<Text>{event?.camera}</Text>
					</Skeleton>
				</Flex>
				<Flex gap={"1rem"} direction={"row"} mx={"1rem"}>
					<Text style={{ fontWeight: "bold" }}>Label: </Text>
					<Skeleton visible={isLoading}>
						<Text>{event?.label}</Text>
					</Skeleton>
				</Flex>
				<Flex gap={"1rem"} direction={"row"} mx={"1rem"}>
					<Text style={{ fontWeight: "bold" }}>Probability: </Text>
					<Skeleton visible={isLoading}>
						<Text>{event?.data.top_score}</Text>
					</Skeleton>
				</Flex>
				<Divider w={"100%"} />
				<Flex gap={"1rem"} direction={"row"} justify={"center"} mb={"1rem"}>
					<Text>~ downloadbuttons ~</Text>
				</Flex>
			</Flex>
		</Card>
	);
};
