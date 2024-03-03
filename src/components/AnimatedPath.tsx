import { motion } from "framer-motion";

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
        const delay = 0.1 + i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 }
            },
            rotate: [0, 360], // Rotating animation
            scale: [1, 1.5, 1] // Scale animation for a pulsing effect
        };
    }
};

export default function AnimatedPath() {
    const colors = {
        green: "#00cc88",
        red: "#ff0055",
        blue: "#0099ff",
        yellow: "#ffdd00"
    }

    const svgStyle = {
        strokeWidth: "10px",
        strokeLinecap: "round",
        fill: "transparent"
    };

    return (
        <motion.svg
            className={"w-[30vw] h-[100%]"}
            viewBox="0 0 600 600"
            initial="hidden"
            whileInView="visible"
        >
            {/* Row 1 */}
            <motion.circle
                cx="100"
                cy="100"
                r="80"
                stroke={colors.red}
                variants={draw}
                custom={1}
                style={svgStyle}
            />
            <motion.rect
                width="140"
                height="140"
                x="220"
                y="30"
                rx="20"
                stroke={colors.green}
                variants={draw}
                custom={1.5}
                style={{ ...svgStyle, fill: "none" }}
            />
            <motion.line
                x1="420"
                y1="30"
                x2="550"
                y2="170"
                stroke={colors.yellow}
                variants={draw}
                custom={2}
                style={svgStyle}
            />
            <motion.line
                x1="420"
                y1="170"
                x2="550"
                y2="30"
                stroke={colors.yellow}
                variants={draw}
                custom={2.5}
                style={{ ...svgStyle, fill: "none" }}
            />

            {/* Row 2 */}
            <motion.polygon
                points="100,230 180,370 20,370"
                stroke={colors.blue}
                variants={draw}
                custom={2}
                style={svgStyle}
            />
            <motion.line
                x1="220"
                y1="230"
                x2="360"
                y2="370"
                stroke={colors.red}
                variants={draw}
                custom={2.5}
                style={svgStyle}
            />
            <motion.line
                x1="220"
                y1="370"
                x2="360"
                y2="230"
                stroke={colors.red}
                variants={draw}
                custom={3}
                style={svgStyle}
            />
            <motion.circle
                cx="480"
                cy="300"
                r="70"
                stroke={colors.green}
                variants={draw}
                custom={3.5}
                style={svgStyle}
            />

            {/* Row 3 */}
            <motion.rect
                width="140"
                height="140"
                x="20"
                y="430"
                rx="20"
                stroke={colors.yellow}
                variants={draw}
                custom={3.6}
                style={{ ...svgStyle, fill: "none" }}
            />
            <motion.circle
                cx="290"
                cy="500"
                r="70"
                stroke={colors.green}
                variants={draw}
                custom={3.5}
                style={svgStyle}
            />
            <motion.polygon
                points="480,430 560,570 400,570"
                stroke={colors.red}
                variants={draw}
                custom={5}
                style={svgStyle}
            />
        </motion.svg>
    );
}
