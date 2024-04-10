import { Card, Group, Badge, Flex, Skeleton } from "@mantine/core";

import { motion } from "framer-motion";
import { useState } from "react";

export const EventListCardLoader = () => {
	const [scale, setScale] = useState(1);

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
				<Card shadow="sm" padding="lg" radius="md" withBorder>
					<Card.Section>
						<Flex gap={"1rem"} direction={"row"}>
							<Skeleton mih={"9rem"} maw={"9rem"} visibleFrom="sm" />
							<Skeleton mih={"6rem"} maw={"6rem"} hiddenFrom="sm" />
							<Flex
								justify="space-between"
								my="xs"
								mr="xs"
								direction={"column"}
								w={"100%"}
							>
								<Group justify="space-between">
									<Skeleton fw={500} visibleFrom="sm" miw={"10rem"} />
									<Skeleton fw={500} hiddenFrom="sm" miw="10rem" />
									<Badge color="teal" variant="filled" ml="auto" miw={"2rem"} />
								</Group>
								<Skeleton c="dimmed" />
								<Skeleton c="dimmed" />
								<Skeleton c="dimmed" />
							</Flex>
						</Flex>
					</Card.Section>
				</Card>
			</motion.div>
		</motion.div>
	);
};
