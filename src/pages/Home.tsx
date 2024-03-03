import logo from '../assets/logo.svg';
import stardust from '../assets/stardust.svg';
import tree from '../assets/tree.svg';
import oval_background from '../assets/ovalbackground.svg';
import oval_background_purple from '../assets/ovalbackground-purple.svg';
import BlackWave from '../components/Wave/BlackWave';
import { DevCard } from '../components/DevCards/DevCard';
import { SignInButton, useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const userAction = useAction(api.action.create);
  const handleClick = () => {
    console.log('Called?');
    if (user.userId) userAction({ userId: user.userId });
    navigate('/host-guest');
  };

  const buttonController = () => {
    if (user.isSignedIn) {
      return (
        <button
          onClick={handleClick}
          className="mt-[200px] w-full min-w-[100px] py-4 px-5 bg-hackathon-pink hover:bg-hackathon-dark-blue text-white font-bold rounded-lg transform hover:scale-110 transition-transform duration-150 ease-in-out active:button-press">
          <p className="text-sm sm:text-lg md:text-xl">Get Started</p>
        </button>
      );
    } else {
      return (
        <React.Fragment>
          <SignInButton mode="modal" afterSignInUrl="/" redirectUrl="/">
            <button className="mt-[200px] w-full min-w-[100px] py-4 px-5 bg-hackathon-pink hover:bg-hackathon-dark-blue text-white font-bold rounded-lg transform hover:scale-110 transition-transform duration-150 ease-in-out active:button-press">
              <p className="text-sm sm:text-lg md:text-xl">Get Started</p>
            </button>
          </SignInButton>
        </React.Fragment>
      );
    }
  };

  const text = 'Start your new adventure!';

  const stardustVariantL = {
    hidden: { scale: 0, opacity: 0, rotate: 0 },
    visible: {
      scale: [1, 1.3, 1],
      opacity: [0, 1, 0.5, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  };

  const stardustVariantR = {
    hidden: { scale: 0, opacity: 0, rotate: 0 },
    visible: {
      scale: [1, 1.7, 1],
      opacity: [0, 1, 0.7, 1],
      rotate: [0, 20, -20, 0],
      transition: { duration: 2, ease: 'easeInOut' },
    },
  };

  const calculateDelay = (index) => 1.3 + index * 0.05; // Starts after 2 seconds, then each letter appears 0.05s after the previous one

  return (
    <>
      <div className="bg-gradient-to-b from-hackathon-purple to-hackathon-gradient min-h-screen w-full overflow-hidden">
        <div className="relative flex justify-center items-center min-h-screen">
          <motion.img
            className="absolute top-[30%] left-[30%] w-[5%] z-10"
            src={stardust}
            alt="Stardust-svg"
            variants={stardustVariantL}
            initial="hidden"
            whileInView={'visible'}
          />
          <img
            className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-[20%] z-20"
            src={logo}
            alt={'logo'}
          />
          <motion.img
            className="absolute top-[10%] right-[30%] w-[7%] z-10"
            src={stardust}
            alt="Stardust-svg"
            variants={stardustVariantR}
            initial="hidden"
            whileInView={'visible'}
          />

          <img
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0 w-full"
            src={oval_background}
            alt="oval-background-svg"
          />
          <img
            className="absolute bottom-[0] left-[77%] transform -translate-x-1/2 z-0 w-[40%]"
            src={tree}
            alt="tree-svg"
          />
          <img
            className="absolute bottom-[0] left-[20%] transform -translate-x-1/2 z-0 w-[30%]"
            src={tree}
            alt="tree-svg"
          />

          <div className="z-10 flex flex-col items-center">
            {buttonController()}
            <div className={'mt-[20px] text-white font-bold text-[1rem] sm:text-[1rem] md:text-[1.5rem]'}>
              {text.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{
                    opacity: 0,
                    y: -20,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      delay: calculateDelay(index),
                      duration: 0.1,
                    },
                  }}>
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-hackathon-dark-blue to-hackathon-gradient min-h-screen relative z-[1] grid grid-cols-2 items-start">
        <div className="flex flex-col items-center text-center mt-[100px] md:mt-[50px] lg:mt-[100px] text-white">
          <div className="catch text-left w-full sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-[500px] mx-auto justify-center">
            <p className="font-bold text-[3rem] sm:text-[4rem] md:text-[5rem] mb-[-20px]">Customize</p>
            <p className="font-bold text-[3rem] sm:text-[4rem] md:text-[5rem] mb-[-20px]">Your Own</p>
            <p className="font-bold text-[3rem] sm:text-[4rem] md:text-[5rem] mb-[-20px]">Game</p>
            <p className="mt-[40px] text-white text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] text-left">
              AI will become the Game Master for your imaginative game!
            </p>
          </div>
        </div>
        <div className="svgDiv mx-auto mt-[50px] sm:mt-[75px] md:mt-[100px]">
          <img className="w-[60%] sm:w-[70%] md:w-[80%] mx-auto" src={logo} alt={'logo'} />
        </div>
        <img
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-[2] w-full max-h-full"
          src={oval_background_purple}
          alt="oval-background-svg"
        />
      </div>
      <div className="bg-gradient-to-b from-hackathon-blue to-hackathon-gradient min-h-full w-full">
        <div className="flex flex-col items-center">
          <div className="text-[3rem] sm:text-[4rem] md:text-[5rem] font-bold text-white text-center">Developers</div>
          <div className="flex flex-col sm:flex-row justify-between items-center px-4 w-[95%] sm:w-[80%] mt-[50px] sm:mt-[100px]">
            <div className="flex-1 mb-4 sm:mb-0">
              <DevCard />
              <div className="text-[1.2rem] sm:text-[1.5rem] text-center text-white mt-[30px]">Derek Williams</div>
              <div className="text-[1rem] sm:text-[1.1rem] text-center text-white">Position</div>
            </div>
            <div className="flex-1 mb-4 sm:mb-0">
              <DevCard />
              <div className="text-[1.2rem] sm:text-[1.5rem] text-center text-white mt-[30px]">Hla Htun</div>
              <div className="text-[1rem] sm:text-[1.1rem] text-center text-white">Position</div>
            </div>
            <div className="flex-1">
              <DevCard />
              <div className="text-[1.2rem] sm:text-[1.5rem] text-center text-white mt-[30px]">Imgyeong Lee</div>
              <div className="text-[1rem] sm:text-[1.1rem] text-center text-white">Position</div>
            </div>
          </div>
          <div className="deco">
            <motion.img
              className="relative w-[65%] sm:w-[65%] md:w-[65%] top-[-40vh] sm:top-[-40vh] md:top-[-40vh] left-[-40vw] sm:left-[-40vw] md:left-[-40vw] z-10"
              src={stardust}
              alt="Stardust-svg"
              style={{ marginRight: '-100%' }}
              variants={stardustVariantL}
              initial="hidden"
              whileInView={'visible'}
            />
            <motion.img
              className="relative w-[65%] sm:w-[65%] md:w-[65%] top-[-45vh] sm:top-[-45vh] md:top-[-45vh] right-[-47vw] sm:right-[-47vw] md:right-[-47vw] z-10"
              src={stardust}
              alt="Stardust-svg"
              style={{ marginLeft: '-100%' }}
              variants={stardustVariantL}
              initial="hidden"
              whileInView={'visible'}
            />
          </div>
        </div>
      </div>
      <div className="relative bottom-[0] z-[20] w-full">
        <BlackWave />
      </div>
    </>
  );
};

export default Home;
