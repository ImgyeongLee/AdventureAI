import { motion } from 'framer-motion';

export const ButtonInfo = ({ text }) => {
  return (
    <motion.div
      className="bottom-[20px] bg-hackathon-black text-white absolute p-2 shadow-md border-0 rounded-[10px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}>
      {text}
    </motion.div>
  );
};
