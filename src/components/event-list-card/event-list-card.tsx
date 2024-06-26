import { Card, Group, Image, Text, Badge, Flex } from "@mantine/core";
import type { CameraEvent } from "../../models/camera-event.model";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CameraNames } from "../../config/enum-camera-names";

export const EventListCard = (props: CameraEvent) => {
	const navigate = useNavigate();
	const timestamp = dayjs.unix(props.start_time);
	const image = `data:image/jpeg;base64,${props.thumbnail}`;
	const fallbackImage = "https://placehold.co/600x400?text=error";
	const [scale, setScale] = useState(1);

	const navigateToEvent = () => {
		navigate(`/event/${props.id}`);
	};
	return (
		<motion.div
			initial={{ opacity: 0, scale: 1 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			<motion.div
				onHoverStart={() => setScale(1.04)}
				onHoverEnd={() => setScale(1)}
				onTouchStart={() => setScale(1.04)}
				onTouchEnd={() => setScale(1)}
				animate={{ scale: scale }}
			>
				<Card
					shadow="sm"
					padding="lg"
					radius="md"
					withBorder
					onClick={navigateToEvent}
				>
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
										{CameraNames[props.camera as keyof typeof CameraNames] ??
											"Unknown"}
									</Badge>
								</Group>

								<Text size="sm" c="dimmed">
									{`Label: ${props.label}`}
								</Text>
								<Text size="sm" c="dimmed">
									{`Probability: ${(props.data.score * 100).toFixed(2)}%`}
								</Text>
								<Text size="sm" c="dimmed">
									{`EventId: ${props.id}`}
								</Text>
							</Flex>
						</Flex>
					</Card.Section>
				</Card>
			</motion.div>
		</motion.div>
	);
};
