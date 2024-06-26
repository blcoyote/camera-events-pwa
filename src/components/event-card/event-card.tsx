import {
	Card,
	Flex,
	Image,
	Skeleton,
	Title,
	Text,
	Divider,
	useMantineTheme,
} from "@mantine/core";
import type { CameraEvent } from "../../models/camera-event.model";
import { IconMovie, IconPhoto } from "@tabler/icons-react";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useAuthProvider } from "../../hooks/use-auth-provider";

interface EventContainerProps {
	event?: CameraEvent;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	snapshotData?: string;
	isSnapshotLoading: boolean;
	refetch?: () => void;
}

export const EventContainer = (props: EventContainerProps) => {
	const { event, isLoading, isError, isSnapshotLoading, snapshotData } = props;
	const image = snapshotData && `data:image/jpeg;base64,${snapshotData}`;
	const fallbackImage = "https://placehold.co/600x400?text=error";
	const { token } = useAuthProvider();

	const theme = useMantineTheme();

	if (isError) {
		return <div>Error...</div>;
	}

	return (
        <Card shadow="sm" padding="dm" radius="md" withBorder>
            <Card.Section>
                <Skeleton visible={isSnapshotLoading} mb={"1rem"}>
                    <Image src={image} fallbackSrc={fallbackImage} />
                </Skeleton>
            </Card.Section>
            <Skeleton visible={isLoading}>
                <Title
                    size={"md"}
                    hiddenFrom="sm"
                    ml={"1rem"}
                >{`Event: ${event?.id}`}</Title>
                <Title
                    visibleFrom="sm"
                    ml={"1rem"}
                >{`Event: ${event?.id}`}</Title>
            </Skeleton>

            <Flex gap={"1rem"} direction={"column"} pt={"1rem"}>
                <Divider w={"100%"} label={"Details"} labelPosition="center" />
                <Flex gap={"1rem"} direction={"row"} mx={"1rem"}>
                    <Text style={{ fontWeight: "bold" }}>Timestamp: </Text>
                    <Skeleton visible={isLoading}>
                        <Text>
                            {event &&
                                dayjs
                                    .unix(event?.start_time)
                                    .format("DD MMM. YYYY HH:mm:ss")}
                        </Text>
                    </Skeleton>
                </Flex>
                <Flex gap={"1rem"} direction={"row"} mx={"1rem"}>
                    <Text style={{ fontWeight: "bold" }}>Camera: </Text>
                    <Skeleton visible={isLoading}>
                        <Text>
                            {event &&
                                event?.camera.charAt(0).toUpperCase() +
                                    event?.camera.slice(1)}
                        </Text>
                    </Skeleton>
                </Flex>
                <Flex gap={"1rem"} direction={"row"} mx={"1rem"}>
                    <Text style={{ fontWeight: "bold" }}>Label: </Text>
                    <Skeleton visible={isLoading}>
                        <Text>
                            {event &&
                                event?.label.charAt(0).toUpperCase() +
                                    event?.label.slice(1)}
                        </Text>
                    </Skeleton>
                </Flex>
                <Flex gap={"1rem"} direction={"row"} mx={"1rem"}>
                    <Text style={{ fontWeight: "bold" }}>Probability: </Text>
                    <Skeleton visible={isLoading}>
                        <Text>{`${
                            event && (event.data.score * 100).toFixed(2)
                        }%`}</Text>
                    </Skeleton>
                </Flex>
                <Divider
                    w={"100%"}
                    label={"Downloads"}
                    labelPosition="center"
                />
                <Flex
                    gap={"5rem"}
                    direction={"row"}
                    justify={"center"}
                    mb={"1rem"}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <a
                            href={`${
                                import.meta.env.VITE_BaseURL
                            }/api/v2/downloads/${
                                event?.id
                            }/snapshot.jpg?token=${token}`}
                        >
                            <IconPhoto size={40} color={theme.colors.blue[4]} />
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <a
                            href={`${
                                import.meta.env.VITE_BaseURL
                            }/api/v2/downloads/${
                                event?.id
                            }/clip.mp4?token=${token}`}
                        >
                            <IconMovie size={40} color={theme.colors.blue[4]} />
                        </a>
                    </motion.div>
                </Flex>
            </Flex>
        </Card>
    );
};
