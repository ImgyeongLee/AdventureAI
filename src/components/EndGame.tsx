import { motion } from "framer-motion";

const popUpVariants = {
    initial: {
        scale: 0,
        opacity: 0,
        borderRadius: "100%",
    },
    visible: {
        scale: 1,
        opacity: 1,
        borderRadius: "0",
        transition: {
            duration: 0.5
        }
    }
}

export const EndGame = ( {win_or_lose_string}) => {
    win_or_lose_string = "Game Over"
    return (
        <motion.div
            className="bg-hackathon-black bg-opacity-75 min-h-full min-w-full flex items-center justify-center fixed inset-0 z-[100]"
            variants={popUpVariants}
            initial={"initial"}
            animate={"visible"}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">{win_or_lose_string}</h2>
                <p className="mb-4">Your game has ended. Thank you for playing!</p>
                <div className="flex justify-center">
                    <motion.button
                        className="bg-hackathon-purple text-white font-bold py-2 px-4 rounded"
                        variants={popUpVariants}
                        whileHover={{
                            scale: 1.2
                        }}
                        whileTap={{
                            scale: 0.8
                        }}
                    >
                        Play Again
                    </motion.button>
                    <motion.button
                        className="ml-4 bg-gray-300 text-black py-2 px-4 rounded"
                        variants={popUpVariants}
                        whileHover={{
                            scale: 1.2
                        }}
                        whileTap={{
                            scale: 0.8
                        }}
                    >
                        Exit
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}