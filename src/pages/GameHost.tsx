import image from '../assets/placeholder-image.png';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

const PlayerMessage = ({ player, message }) => (
    <div className="flex flex-col items-start justify-start mb-7">
        <div className="mb-1 text-sm font-bold">{player}</div>
        <div className="max-w-[80%] border-b border-dashed">{message}</div>
    </div>
);

const HostMessage = ({ message }) => (
    <div className="flex justify-center w-full mb-4">
        <div className="text-center min-w-[80%] bg-hackathon-host-chatbox-background text-white p-4 border border-hackathon-white rounded-lg">
            <div className={"italic"}>{message}</div>
        </div>
    </div>
);

export const GameHost = () => {
    const { gameId } = useParams();
    console.log("gameId: ", gameId)
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null); // Reference to the end of the messages
    const [messages, setMessages] = useState([
        {
            user: "Nadir",
            message: "Okay"
        },
        {
            user: "Yema",
            message: "Ok"
        },
        {
            user: "Kilo",
            message: "k"
        },
    ]);

    const handleSendMessage = (e) => {
        e.preventDefault()
        console.log("message will now be sent to server")
        if (!newMessage.trim()) return; // Ignore empty messages
        setMessages((prev) => [...prev, {"user": "You", "message": newMessage}])
        setNewMessage("")
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const text = 'There is a mountain called Lorem Ipsum';

    return (
        <div className="bg-custom-gradient container flex min-w-full min-h-full">
            <div className="flex-1 flex flex-col justify-between p-[50px]">
                <div className="generated-image flex-[3] overflow-hidden rounded-lg border-0">
                    <img src={image} alt="image" className="w-full h-full object-contain" />
                </div>
                <div className="prompt w-full h-[200px] mt-4 bg-black text-white border-0 rounded-[10px] flex items-center justify-center">
                    <p className="max-w-[80%]">{text}</p>
                </div>
            </div>
            <div className="chatbox p-[50px] bg-hackathon-chatbox-background flex flex-col flex-1 text-white max-h-[100vh]">
                <div className="scrollbar-style overflow-auto flex-grow">
                    {messages?.map((msg, index) =>
                        msg.user === "You" ? (
                            <HostMessage key={index} message={msg.message} />
                        ) : (
                            <PlayerMessage key={index} player={msg.user} message={msg.message} />
                        )
                    )}
                    <div ref={messagesEndRef} /> {/* Invisible element at the end of messages */}
                </div>
                <div className="send-messages mt-4">
                    <form className="flex gap-2" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className="flex-1 p-2 rounded-md text-black"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(() => (e.target.value) )}
                        />
                        <motion.button
                            type="submit"
                            className="bg-hackathon-dark-blue-500 hover:bg-hackathon-gradient text-white font-bold py-2 px-4 rounded-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Send
                        </motion.button>
                    </form>
                    <div className="flex flex-col items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-hackathon-yellow text-black min-w-[60%] p-[10px] border-0 rounded-[10px] my-5 text-[1.1rem] font-bold"
                        >
                            Additional Info
                        </motion.button>
                        <div className="flex flex-row justify-center space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-[10px] border-0 rounded-[10px] bg-hackathon-purple"
                            >
                                Start Game
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-[10px] border-0 rounded-[10px] bg-hackathon-purple"
                            >
                                Start Battle
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-[10px] border-0 rounded-[10px] bg-hackathon-purple"
                            >
                                End Game
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
