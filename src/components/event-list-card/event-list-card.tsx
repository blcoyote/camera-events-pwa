import { Card, Group, Image, Text, Badge, Flex } from "@mantine/core";
import type { CameraEvent } from "../../models/camera-event.model";
import dayjs from "dayjs";

export const EventListCard = (props: CameraEvent) => {
    const timestamp = dayjs.unix(props.start_time);
	const image = `data:image/jpeg;base64,${props.thumbnail}`;
    const fallbackImage = "https://placehold.co/600x400?text=error";
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Card.Section>
				<Flex gap={"1rem"} direction={"row"}>
					<Image
						src={image}
						maw={"9rem"}
						visibleFrom="sm"
						fallbackSrc={fallbackImage}
					/>
					<Image
						src={image}
						maw={"6rem"}
						hiddenFrom="sm"
						fallbackSrc={fallbackImage}
					/>
					<Flex
						justify="space-between"
						my="xs"
						mr="xs"
						direction={"column"}
						w={"100%"}
					>
						<Group justify="space-between">
							<Text size="sm" fw={500} visibleFrom="sm">
								{timestamp.format("DD/MM/YYYY HH:mm:ss")}
							</Text>
							<Text size="sm" fw={500} hiddenFrom="sm">
								{timestamp.format("DD/MM HH:mm")}
							</Text>
							<Badge color="teal" variant="filled" ml="auto">
								{props.camera}
							</Badge>
						</Group>

						<Text size="sm" c="dimmed">
							{`label: ${props.label}`}
						</Text>
						<Text size="sm" c="dimmed">
							{`Sansynlighed: ${(props.data.top_score * 100).toFixed(2)}%`}
						</Text>
						<Text size="sm" c="dimmed">
							{`eventId: ${props.id}`}
						</Text>
					</Flex>
				</Flex>
			</Card.Section>
		</Card>
	);
};
