import { motion } from "framer-motion";
import { useState } from "react";
import { CardLoader } from "./card";

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
                <CardLoader />
            </motion.div>
        </motion.div>
    );
};

