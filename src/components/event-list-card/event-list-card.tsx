import type { CameraEvent } from "../../models/camera-event.model";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "./card";

interface EventListCardProps extends CameraEvent {
    isLoading: boolean;
}

export const EventListCard = (props: EventListCardProps) => {
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
                <Card {...props} />
            </motion.div>
        </motion.div>
    );
};

