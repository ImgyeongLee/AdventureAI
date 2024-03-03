import image from "../assets/placeholder-image.png"
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const PlayerMessage = ({ player, message }) => (
    <div className="flex flex-col items-start justify-start mb-7">
        <div className="mb-1 text-sm font-bold">
            {player}
        </div>
        <div className="max-w-[80%] border-b border-dashed">
            {message}
        </div>
    </div>
);

const YourMessage = ({ message }) => (
    <div className="flex flex-col items-end justify-end mb-4 pr-10">
        <div className="mb-1 text-sm font-bold text-white">
            You
        </div>
        <div className="max-w-[80%] border-b border-dashed">
            {message}
        </div>
    </div>
);

export const GamePlay = () => {
    const { gameId } = useParams();
    console.log("== gameplay page received id: ", gameId);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([{ sender: '', text: '' },]);
    const messagesEndRef = useRef(null); // Reference to the end of the messages

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return; // Ignore empty messages
        const updatedMessages = [...messages, { sender: 'You', text: newMessage }];
        setMessages(updatedMessages);
        setNewMessage('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const text = "There is a mountain called Lorem Ipsum";

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
                <div className="messages overflow-auto flex-grow">
                    {messages.map((msg, index) => (
                        msg.sender === 'You' ?
                            <YourMessage key={index} message={msg.text} /> :
                            <PlayerMessage key={index} player={msg.sender} message={msg.text} />
                    ))}
                    <div ref={messagesEndRef} /> {/* Invisible element at the end of messages */}
                </div>
                <div className="send-messages mt-4">
                    <form className="flex gap-2" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className="flex-1 p-2 rounded-md text-black"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-hackathon-dark-blue-500 hover:bg-hackathon-gradient text-white font-bold py-2 px-4 rounded-md">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}