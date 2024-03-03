import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const popUpVariants = {
  initial: {
    scale: 0,
    opacity: 0,
    borderRadius: '100%',
  },
  visible: {
    scale: 1,
    opacity: 1,
    borderRadius: '0',
    transition: {
      duration: 0.5,
    },
  },
};

export const EndGame = ({ win_or_lose_string, setIsToggle, setIsEnd }) => {
  return (
    <motion.div
      className="bg-hackathon-black bg-opacity-75 min-h-full min-w-full flex items-center justify-center fixed inset-0 z-[100]"
      variants={popUpVariants}
      initial={'initial'}
      animate={'visible'}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm">
        <p>If you end your game right now, the result is: </p>
        <h2 className="text-2xl font-bold mb-4 mt-2 text-center">{win_or_lose_string}</h2>
        <p className="mb-4 text-center">Are you sure?</p>
        <div className="flex justify-center">
          <motion.button
            className="bg-hackathon-purple text-white font-bold py-2 px-4 rounded-md"
            onClick={() => {
              setIsEnd(true);
            }}
            variants={popUpVariants}
            whileHover={{
              scale: 1.2,
            }}
            whileTap={{
              scale: 0.8,
            }}>
            Yes
          </motion.button>
          <motion.button
            className="ml-4 bg-gray-300 text-black py-2 px-4 rounded-md"
            variants={popUpVariants}
            onClick={() => {
              setIsToggle(false);
            }}
            whileHover={{
              scale: 1.2,
            }}
            whileTap={{
              scale: 0.8,
            }}>
            Exit
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
