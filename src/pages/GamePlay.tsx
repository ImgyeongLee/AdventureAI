import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAction, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { PuffLoader } from 'react-spinners';
import placeholderImage from '../assets/placeholder-image.png';

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

const healthVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "100%", opacity: 1, transition: { duration: 1 } },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const GamePlay = () => {
  const { gameId } = useParams();
  // const user = useAuth();
  console.log('== gameplay page received id: ', gameId);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Player1', body: 'Hello there!' },
    { sender: 'You', body: 'Hi! How are you?' },
    { sender: 'Player2', body: 'This game is fun!' },
  ]);
  // const messages = useQuery(api.message.getMessages, { gameId: Number(gameId) });
  // const createMessage = useAction(api.action.sentMessage);
  const createMessage = (message) => {
    console.log('Mock send message:', message);
    setMessages([...messages, { sender: 'You', body: message.body }]);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef(null); // Reference to the end of the messages
  const [hp, setHp] = useState(100) // use setHp value obtained from backend to update the hp
  // const gameImage = useQuery(api.https.getImageURL, { gameId: Number(gameId) }) || image;
  const gameImage = placeholderImage

  const handleSendMessage = (e: Event) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Ignore empty messages

    // if (gameId && user.userId) {
    //   createMessage({ gameId: Number(gameId), body: newMessage, userId: user.userId });
    //   setNewMessage('');
    // }
    createMessage({ body: newMessage });
    setNewMessage('');
  };

  // useEffect(() => {
  //   if (!messages) {
  //     setIsLoading(true);
  //   } else {
  //     setIsLoading(false);
  //   }
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const text = 'There is a mountain called Lorem Ipsum';

  return (
    <div className="bg-custom-gradient container flex min-w-full min-h-full">
      <div className="flex-1 flex flex-col justify-between p-[50px]">
        <div className="generated-image flex-[3] overflow-hidden rounded-lg border-0">
          <img src={gameImage} alt="image" className="w-full h-full object-contain max-h-[650px] rounded-lg" />
        </div>
        <div className="prompt w-full h-[200px] mt-4 bg-black text-white border-0 rounded-[10px] flex items-center justify-center">
          <p className="max-w-[80%]">{text}</p>
        </div>
      </div>
      <div className="chatbox p-[50px] bg-hackathon-chatbox-background flex flex-col flex-1 text-white max-h-[100vh]">
        <div className="messages overflow-auto flex-grow">
          <div className="text-center pb-8">Your game invitation code is: {gameId}</div>
          {!isLoading &&
            messages?.map((msg, index) =>
              // msg.sender === user.userId ? (
                msg.sender === "You" ? (
                <YourMessage key={index} message={msg.body} />
              ) : (
                <PlayerMessage key={index} player={msg.sender} message={msg.body} />
              )
            )}
          {isLoading && (
            <div className="flex text-center justify-center">
              <PuffLoader color="#ffffff" />
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Invisible element at the end of messages */}
        </div>
        <div className="flex items-start space-x-4 w-full">
          {/* Attack Button */}
          <motion.button
              className="px-5 py-3 bg-hackathon-purple text-white border-0 rounded-[10px] cursor-pointer"
              style={{ maxWidth: "150px" }} // Set a max width for smaller buttons
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setHp((prev) => Math.max(0, prev - 10))}
          >
            Attack
          </motion.button>

          {/* Ultimate Button */}
          <motion.button
              className="px-5 py-3 bg-hackathon-purple text-white border-0 rounded-[10px] cursor-pointer"
              style={{ maxWidth: "150px" }} // Set a max width for smaller buttons
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setHp((prev) => Math.max(0, prev - 20))}
          >
            Ultimate
          </motion.button>

          {/* HP Bar - Keeping it as is for now, adjust based on new button sizes */}
          <div className="flex-grow flex items-center min-w-[20%] max-w-[50%] h-full bg-gray-200 rounded-[10px] overflow-hidden">
            {hp > 0 ? (
                <motion.div
                    className="bg-hackathon-purple text-white h-full rounded-[10px] flex items-center justify-center"
                    style={{ width: `${hp}%` }} // Reflect HP as width percentage
                    initial={{ width: "100%" }}
                    animate={{ width: `${hp}%` }}
                >
                  <span className="px-2">{`${hp} HP`}</span>
                </motion.div>
            ) : (
                <motion.div
                    className="bg-red-600 text-black h-full rounded-[10px] flex items-center justify-center w-full"
                    variants={healthVariants}
                    initial={"hidden"}
                    animate={"visible"}
                >
                  <motion.span
                      className="px-2"
                      variants={textVariants}
                      initial={"hidden"}
                      animate={"visible"}
                  >0 HP</motion.span>
                </motion.div>
            )}
          </div>
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
