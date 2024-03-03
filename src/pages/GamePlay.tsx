import { useState, useEffect, useRef, FormEventHandler, MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import { useAction, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { PuffLoader } from 'react-spinners';
import placeholderImage from '../assets/placeholder-image.png';
import React from 'react';

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
  <div className="text-center p-4 bg-black text-slate-200 italic cursor-default select-none rounded-lg my-2">
    <div>{message}</div>
  </div>
);

const healthVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: '100%', opacity: 1, transition: { duration: 1 } },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const GamePlay = () => {
  const { gameId } = useParams();
  const user = useAuth();
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isDead, setIsDead] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState('');
  const messages = useQuery(api.message.getMessages, { gameId: Number(gameId) });
  const gameInfo = useQuery(api.game.getGameInfo, { gameId: Number(gameId) });
  const userInfo = useAction(api.action.getUserInfo);
  const createMessage = useAction(api.action.sentMessage);
  const updateStatus = useAction(api.game.updateStatus);
  const createFirstScene = useAction(api.gameflow.generateFirstScene);
  const attackAction = useAction(api.gameflow.monsterResponse);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTextLoading, setIsTextLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [hp, setHp] = useState(100); // use setHp value obtained from backend to update the hp
  const gameImage = useQuery(api.https.getImageURL, { gameId: Number(gameId) }) || placeholderImage;

  const renderMessage = (senderType: string, index: number, body: string, sender: string) => {
    if (senderType == 'System') {
      return <SystemMessage key={index} message={body} />;
    } else if (senderType == user.userId) {
      return <YourMessage key={index} message={body} />;
    } else {
      return <PlayerMessage key={index} player={sender} message={body} />;
    }
  };

  const renderPlayerButtons = () => {
    if (!isHost && gameInfo && gameInfo.status == 'battle') {
      return (
        <React.Fragment>
          <div className="flex items-center justify-center space-x-4 w-full">
            {/* Attack Button */}
            <motion.button
              className="px-5 py-3 bg-hackathon-purple text-white border-0 rounded-[10px] cursor-pointer disabled:bg-slate-700 disabled:text-black"
              style={{ maxWidth: '150px' }} // Set a max width for smaller buttons
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAttack}
              disabled={isDead}>
              Attack
            </motion.button>

            {/* Ultimate Button */}
            <motion.button
              className="px-5 py-3 bg-hackathon-purple text-white border-0 rounded-[10px] cursor-pointer disabled:bg-slate-700 disabled:text-black"
              style={{ maxWidth: '150px' }} // Set a max width for smaller buttons
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkill}
              disabled={isDead}>
              Ultimate
            </motion.button>

            {/* HP Bar - Keeping it as is for now, adjust based on new button sizes */}
            <div className="flex-grow flex items-center min-w-[20%] max-w-[50%] h-full bg-gray-200 rounded-[10px] overflow-hidden">
              {hp > 0 ? (
                <motion.div
                  className="bg-hackathon-purple text-white h-full rounded-[10px] flex items-center justify-center"
                  style={{ width: `${hp}%` }} // Reflect HP as width percentage
                  initial={{ width: '100%' }}
                  animate={{ width: `${hp}%` }}>
                  <span className="px-2">{`${hp} HP`}</span>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-red-600 text-black h-full rounded-[10px] flex items-center justify-center w-full"
                  variants={healthVariants}
                  initial={'hidden'}
                  animate={'visible'}>
                  <motion.span className="px-2" variants={textVariants} initial={'hidden'} animate={'visible'}>
                    0 HP
                  </motion.span>
                </motion.div>
              )}
            </div>
          </div>
        </React.Fragment>
      );
    }
  };

  const checkHost = () => {
    if (user && user.userId) {
      userInfo({ userId: user.userId }).then((currentUser) => {
        if (currentUser.isHost) {
          setIsHost(true);
        }
      });
    }
  };

  const checkHP = () => {
    if (user && user.userId) {
      userInfo({ userId: user.userId }).then((currentUser) => {
        setHp(currentUser.healthPoints);
        if (!currentUser.isHost && currentUser.healthPoints <= 0) {
          setIsDead(true);
        }
      });
    }
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsStart(!isStart);

    if (!isStart) {
      createMessage({ gameId: Number(gameId), body: 'The game is started!', userId: 'System' });
      updateStatus({ gameId: Number(gameId), status: 'battle' }).then(() => {
        setIsTextLoading(true);
        createFirstScene({ gameId: Number(gameId) }).then(() => {
          setIsTextLoading(false);
        });
      });
    } else {
      createMessage({ gameId: Number(gameId), body: 'The game ended.', userId: 'System' });
      updateStatus({ gameId: Number(gameId), status: 'end' });
    }
  };

  const handleSendMessage: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Ignore empty messages

    if (gameId && user.userId) {
      createMessage({ gameId: Number(gameId), body: newMessage, userId: user.userId });
      setNewMessage('');
    }
  };

  const handleAttack = () => {
    if (gameId && user.userId) {
      attackAction({ gameId: Number(gameId), userId: user.userId, usingSkill: false });
    }
  };

  const handleSkill = () => {
    if (gameId && user.userId) {
      attackAction({ gameId: Number(gameId), userId: user.userId, usingSkill: true });
    }
  };

  useEffect(() => {
    if (!messages) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
    checkHost();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    checkHP();
  }, [messages]);

  return (
    <div className="bg-custom-gradient container flex min-w-full min-h-full">
      <div className="flex-1 flex flex-col justify-between p-[50px]">
        <div className="generated-image flex-[3] overflow-hidden rounded-lg border-0">
          <img src={gameImage} alt="image" className="w-full h-full object-contain max-h-[650px] rounded-lg" />
        </div>
        <div className="prompt w-full h-[200px] mt-4 bg-black text-white border-0 rounded-[10px] flex items-center justify-center">
          {gameInfo && !isTextLoading && <p className="max-w-[80%]">{gameInfo.currentDescription}</p>}
          {(!gameInfo || isTextLoading) && <p className="max-w-[80%]">Loading...</p>}
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
        {renderPlayerButtons()}
        <div className="send-messages mt-4">
          <form className="flex gap-2" onSubmit={handleSendMessage}>
            {isHost && (
              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-[10px] border-0 rounded-[10px] bg-hackathon-purple">
                {isStart ? 'End Game' : 'Start Game'}
              </motion.button>
            )}
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
