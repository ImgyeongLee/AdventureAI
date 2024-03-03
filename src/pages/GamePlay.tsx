import image from '../assets/placeholder-image.png';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAction, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { PuffLoader } from 'react-spinners';

const PlayerMessage = ({ player, message }) => (
  <div className="flex flex-col items-start justify-start mb-7">
    <div className="mb-1 text-sm font-bold">{player}</div>
    <div className="max-w-[80%] border-b border-dashed">{message}</div>
  </div>
);

const YourMessage = ({ message }) => (
  <div className="flex flex-col items-end justify-end mb-4 pr-10">
    <div className="mb-1 text-sm font-bold text-white">You</div>
    <div className="max-w-[80%] border-b border-dashed">{message}</div>
  </div>
);

const SystemMessage = ({ message }) => (
  <div className="text-center p-4 bg-black">
    <div>{message}</div>
  </div>
);

export const GamePlay = () => {
  const { gameId } = useParams();
  const user = useAuth();
  console.log('== gameplay page received id: ', gameId);
  const [newMessage, setNewMessage] = useState('');
  const messages = useQuery(api.message.getMessages, { gameId: Number(gameId) });
  const gameInfo = useQuery(api.game.getGameInfo, { gameId: Number(gameId) });
  const createMessage = useAction(api.action.sentMessage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef(null); // Reference to the end of the messages

  const gameImage = useQuery(api.https.getImageURL, { gameId: Number(gameId) }) || image;

  const renderMessage = (senderType: string, index: number, body: string, sender: string) => {
    if (senderType == 'System') {
      return <SystemMessage key={index} message={body} />;
    } else if (senderType == user.userId) {
      return <YourMessage key={index} message={body} />;
    } else {
      return <PlayerMessage key={index} player={sender} message={body} />;
    }
  };

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Ignore empty messages

    if (gameId && user.userId) {
      createMessage({ gameId: Number(gameId), body: newMessage, userId: user.userId });
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (!messages) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-custom-gradient container flex min-w-full min-h-full">
      <div className="flex-1 flex flex-col justify-between p-[50px]">
        <div className="generated-image flex-[3] overflow-hidden rounded-lg border-0">
          <img src={gameImage} alt="image" className="w-full h-full object-contain max-h-[650px] rounded-lg" />
        </div>
        <div className="prompt w-full h-[200px] mt-4 bg-black text-white border-0 rounded-[10px] flex items-center justify-center">
          {gameInfo && <p className="max-w-[80%]">{gameInfo.currentDescription}</p>}
          {!gameInfo && <p className="max-w-[80%]">Loading...</p>}
        </div>
      </div>
      <div className="chatbox p-[50px] bg-hackathon-chatbox-background flex flex-col flex-1 text-white max-h-[100vh]">
        <div className="messages overflow-auto flex-grow">
          <div className="text-center pb-8">Your game invitation code is: {gameId}</div>
          {!isLoading && messages?.map((msg, index) => renderMessage(msg.userId, index, msg.body, msg.sender))}
          {isLoading && (
            <div className="flex text-center justify-center">
              <PuffLoader color="#ffffff" />
            </div>
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
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <motion.button
              type="submit"
              className="bg-hackathon-dark-blue-500 hover:bg-hackathon-gradient text-white font-bold py-2 px-4 rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Send
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};
