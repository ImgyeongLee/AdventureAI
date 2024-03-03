import {motion} from "framer-motion";

const Lobby = () => {
    const welcome = "Welcome to Adventure AI's Lobby!"
    const description = "Get ready for an unforgettable journey filled with challenges, mysteries, and thrilling adventures. Choose your path wisely, team up with friends, or embark on a solo quest. The adventure begins now!"

    const buttonVariants = {
        initial: {
            scale: 1
        },
        _scaleHover: {
            scale: 1.1
        },
        _scaleTap: {
            scale: 0.8
        }
    }
  return (
      <div className="bg-gradient-to-b from-hackathon-dark-blue via-purple-700 to-hackathon-gradient min-h-screen min-w-full text-white flex flex-col justify-center items-center px-4">
          <div className="bg-black/60 rounded-xl p-8 max-w-4xl w-full min-h-[40vh] text-center shadow-2xl flex flex-col justify-center">
              <div className="flex-1 flex flex-col justify-center">
                  <h1 className="text-4xl font-bold mb-4 drop-shadow">{welcome}</h1>
              </div>
              <p className="mb-[40px] text-[1.2rem]">{description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                      className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                      variants={buttonVariants}
                      whileHover={"_scaleHover"}
                      whileTap={"_scaleTap"}
                  >Start Adventure</motion.button>
                  <motion.button
                      className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                      variants={buttonVariants}
                      whileHover={"_scaleHover"}
                      whileTap={"_scaleTap"}
                  >Settings</motion.button>
              </div>
          </div>
      </div>


  )
};

export default Lobby;
